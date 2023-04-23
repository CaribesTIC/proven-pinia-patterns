# Accediendo al Estado

>En estas próximas dos lecciones, vamos a hablar sobre probablemente el tema más importante de Pinia: **state**!

Otras bibliotecas de administración de estado tienden a ser más prescriptivas que Pinia, lo que obliga a los desarrolladores a acceder y mutar su estado de una manera específica. Esto puede conducir a gastos generales innecesarios y rigidez limitante.

Al permitir que los desarrolladores tomen sus propias decisiones sobre los patrones que usan, Pinia nos brinda flexibilidad. Por supuesto, esto puede ser a la vez liberador e intimidante.

>Si está acostumbrado a un flujo de datos estricto (como cambios de estado que solo se realizan mediante acciones dentro de una tienda), es posible que se sienta fuera de su zona de confort.

En esta lección, hablaremos sobre cómo podemos implementar nuestros propios patrones si nuestro proyecto requiere un enfoque más estricto para cambiar el estado, pero primero, echemos un vistazo a cómo accedemos y cambiamos el estado.

## Accediendo al Estado de Pinia

Primero, ¿cómo accedemos al `state`?

## Dentro De Un Tienda

>Si estamos dentro de un **Store** en sí, tenemos acceso a las propiedades del `state` en nuestros `actions` y `getters`, pero hay algunas cosas a tener en cuenta, ya que las cosas son diferentes dentro de un **Store** de **Options** frente a un **Setup**.

En una tienda de **Options**, dentro de nuestros `actions` accederemos al estado usando `this`.

```js{5,6}
actions: {
  async login(username, password) {
    const body = { username, password };
    myFetch("login", "POST", body).then((res) => {
      // accessing state with this.user
      this.user = res.response.value.user
    });
  },
}
```

Dentro de un `getter` en una tienda de **Options**, debemos pasar el estado a nuestro `getter` para poder acceder a él:

```js{2,3}
getters: {
  // pass in the state
  userFirstName: (state) => {
    if (state.user) {
      return (
        state.user.name.charAt(0).toUpperCase() + state.user.name.slice(1)
      );
    }
  },
},
```

En una tienda **Setup** para los `actions` y `getters`, accedemos a la propiedad del estado directamente, tal como lo haríamos dentro de la función `setup` en un componente que usa la sintaxis de `script setup` — no usamos `this`.

En este ejemplo, la propiedad `state` es un `ref`, por lo que se escribe `city.value`.

`📄 src/stores/geolocation.js`
```js{2,3,7}
export const useGeoLocationStore = defineStore("geolocation", () => {
    //state
    const city = ref("");

    // getters
    const loadingMessage = computed(() => {
      if (!city.value) {
        return "Loading your city...";
      }
    });
    // actions
      ...

    return {
       city,
      };
  }
);
```

## Dentro de un Componente

>Podemos acceder al estado de una tienda desde un componente de varias maneras.

La forma más común es importar la tienda al componente Vue y luego invocar la función `useStore`.

`📄 src/views/RestaurantView.vue`
```vue
<script setup>
import { useFavoritesStore } from "../stores/favorites";
const favoritesStore = useFavoritesStore();
</script>
```

Esto nos permite leer y escribir en la tienda usando la notación de puntos para acceder a la propiedad del estado en la tienda:

`📄 src/views/RestaurantView.vue`
```js
function addRestaurant() {
  favoritesStore.userFavorites.push(restaurant);
}
```

Sin embargo, usar la notación de puntos puede volverse una carga si estamos usando muchas propiedades de estado diferentes en un componente. Podemos facilitarnos la vida desestructurando las propiedades del estado de la tienda para que no tengamos que escribir el nombre completo de la tienda para cada propiedad del estado. Pero tenemos que tener cuidado de cómo hacemos esto.

>Nuestro primer instinto podría ser hacer algo como esto:

```js
const { userFavorites } = favoritesStore
```
>Pero esto no funcionará. La propiedad `userFavorites` perdería reactividad.

Para aquellos de ustedes que han trabajado en Vue 3, este problema les puede parecer familiar. En Vue 3, no podemos desestructurar `props` a menos que usemos un método **helper** llamado [toRefs](https://vuejs.org/api/reactivity-utilities.html#torefs). Y en Pinia, no podemos desestructurar las propiedades del estado a menos que usemos un método **helper** de Pinia llamado [storeToRefs](https://pinia.vuejs.org/api/modules/pinia.html#Functions-storeToRefs).

Así es como usamos `storeToRefs` para desestructurar las propiedades de estado de la tienda:

```js
const favoritesStore = useFavoritesStore();
const { userFavorites } = storeToRefs(favoritesStore);
```

>Este **helper** garantiza que las propiedades del estado mantengan la reactividad y facilita la vida para que no tengamos que usar la notación de puntos cada vez que queremos acceder al estado.

## `v-model`

Podemos usar `v-model` para vincular con las propiedades del estado de Pinia tal como lo haríamos en cualquier otro lugar en una aplicación Vue: accedemos directamente a la propiedad del estado de la tienda.

Este ejemplo es el `input` de `city`, donde un usuario ingresa la ciudad en la que desea buscar restaurantes.

`📄 src/components/Search.vue`
```vue
<script setup>
import { useGeoLocationStore } from "../stores/geolocation";
const geoLocationStore = useGeoLocationStore();
const { city } = storeToRefs(geoLocationStore);
  
// ...
</script>

// v-model syncs the input value with the geolocation store as the user types in a different city
<template>
  <div>
    <label for="search-city">City:</label>
    <input v-model="city" placeholder="'Loading your city...'" />
  </div>
  
  // ...
</template>
```

En el tienda de `geolocation`, hay un `watcher` que activará una función cuando cambie el valor de esta ciudad.

`📄 src/stores/geolocation.js`
```js
watch(
  () => city.value, (newValue) => {
      if (newValue) {
        getLatLong(newValue);
      }
    }
);
```

Podríamos comprobar esto en las `devtools` y ver cómo reacciona el estado al instante. A medida que escribe, el valor de `city` (vinculado al `input` por `v-model`) se actualiza y el `watcher` activa la función `getLatLong`, que actualiza las otras propiedades del estado con los detalles de la dirección.

>`v-model` nos permite acceder directamente al estado de la tienda, y también nos permite mutarlo.

## En esta lección, aprendimos cómo acceder al estado.

Esto es lo que cubrimos:

- Vimos que dentro de una **Options Store** podemos usar la palabra clave `this`, a menos que estemos accediendo desde un `getter`, donde debemos pasar el parámetro `state` y acceder a él.
- Vimos que en una **Setup Store**, no necesitamos usar la palabra clave `this`. Podemos acceder a las propiedades de `state` directamente, tal como lo haríamos en una función de `script setup`.
- Aprendimos cómo acceder al estado de los componentes y cómo desestructurar las propiedades del estado usando el método **helper** `storeToRefs`
- Además, analizamos cómo podemos usar `v-model` para vincular una propiedad en nuestro componente a una propiedad del estado en nuestra tienda. Esto accede a esa propiedad del estado, pero también la muta directamente... lo que nos lleva a la segunda parte de esta lección.

>En la siguiente lección, aprenderemos otras formas en las que podemos mutar el estado de Pinia.
