# Accediendo al Estado

>En estas próximas dos lecciones, vamos a hablar sobre probablemente el tema más importante de Pinia: **state**!

Otras bibliotecas de administración de estado tienden a ser más prescriptivas que Pinia, lo que obliga a los desarrolladores a acceder y mutar su estado de una manera específica. Esto puede conducir a gastos generales innecesarios y rigidez limitante.

Al permitir que los desarrolladores tomen sus propias decisiones sobre los patrones que usan, Pinia nos brinda flexibilidad. Por supuesto, esto puede ser a la vez liberador e intimidante.

>Si está acostumbrado a un flujo de datos estricto (como cambios de estado que solo se realizan mediante acciones dentro de una tienda), es posible que se sienta fuera de su zona de confort.

En esta lección, hablaremos sobre cómo podemos implementar nuestros propios patrones si nuestro proyecto requiere un enfoque más estricto para cambiar el estado, pero primero, echemos un vistazo a cómo accedemos y cambiamos el estado.

## Accediendo al Estado de Pinia

Primero, ¿cómo accedemos al `state`?

## Dentro De Un Store

>Si estamos dentro de un **store** en sí, tenemos acceso a las propiedades del `state` en nuestros `actions` y `getters`, pero hay algunas cosas a tener en cuenta, ya que las cosas son diferentes dentro de un `store` de `options` frente a un `setup`.

En una Tienda de **Options**, dentro de nuestros `actions` accederemos al **state** usando `this`.

```js
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

Dentro de un `getter` en un **Options Store**, debemos pasar el **state** a nuestro `getter` para poder acceder a él:

```js
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

En un **Setup Store** para los **actions** y **getters**, accedemos a la propiedad del `state` directamente, tal como lo haríamos dentro de la función `setup` en un componente que usa la sintaxis de `script setup` — no usamos `this`.

En este ejemplo, la propiedad `state` es un `ref`, por lo que se escribe `city.value`.

`📄 src/stores/geolocation.js`
```js
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

>Podemos acceder al `state` de un `store` desde un componente de varias maneras.

La forma más común es importar el `store` al componente Vue y luego invocar la función `useStore`.

`📄 src/views/RestaurantView.vue`
```vue
<script setup>
import { useFavoritesStore } from "../stores/favorites";
const favoritesStore = useFavoritesStore();
</script>
```

Esto nos permite leer y escribir en el `store` usando la notación de puntos para acceder a la propiedad del `state` en el `store`:

`📄 src/views/RestaurantView.vue`
```js
function addRestaurant() {
  favoritesStore.userFavorites.push(restaurant);
}
```

Sin embargo, usar la notación de puntos puede volverse una carga si estamos usando muchas propiedades de `state` diferentes en un componente. Podemos facilitarnos la vida desestructurando las propiedades del `state` del `store` para que no tengamos que escribir el nombre completo del `store` para cada propiedad del `state`. Pero tenemos que tener cuidado de cómo hacemos esto.

>Nuestro primer instinto podría ser hacer algo como esto:

```js
const { userFavorites } = favoritesStore
```
>Pero esto no funcionará. La propiedad `userFavorites` perdería reactividad.

Para aquellos de ustedes que han trabajado en Vue 3, este problema les puede parecer familiar. En Vue 3, no podemos desestructurar `props` a menos que usemos un método **helper** llamado `toRefs`. Y en Pinia, no podemos desestructurar las propiedades del `state` a menos que usemos un método **helper** de Pinia llamado `storeToRefs`.

Así es como usamos `storeToRefs` para desestructurar las propiedades de `state` del `store`:

```js
const favoritesStore = useFavoritesStore();
const { userFavorites } = storeToRefs(favoritesStore);
```

Este **helper** garantiza que las propiedades del `state` mantengan la reactividad y facilita la vida para que no tengamos que usar la notación de puntos cada vez que queremos acceder al `state`.

## V-Model

>Podemos usar `v-model` para vincular con las propiedades del `state` de Pinia tal como lo haríamos en cualquier otro lugar en una aplicación Vue: accedemos directamente a la propiedad del `state` del `store`.

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

En el tienda de geolocalización, hay un `watcher` que activará una función cuando cambie el valor de esta ciudad.

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

Podríamos comprobar esto en las `devtools` y ver cómo reacciona el `state` al instante. A medida que escribe, el valor de `city` (vinculado al `input` por `v-model`) se actualiza y el `watcher` activa la función `getLatLong`, que actualiza las otras propiedades del `state` con los detalles de `address`.

`v-model` nos permite acceder directamente al estado de la tienda, y también nos permite mutarlo.

## En esta lección, aprendimos cómo acceder al estado.

Esto es lo que cubrimos:

- Vimos que dentro de un `option store` podemos usar la palabra clave `this`, a menos que estemos accediendo desde un `getter`, donde debemos pasar el parámetro de `state` y acceder a él.
- Vimos que en un `setup store`, no necesitamos usar la palabra clave `this`. Podemos acceder a las propiedades de `state` directamente, tal como lo haríamos en una función de `script setup`.
- Aprendimos cómo acceder al `state` de los componentes y cómo desestructurar las propiedades del `state` usando el método **helper** `storeToRefs`
- Además, analizamos cómo podemos usar `v-model` para vincular una propiedad en nuestro componente a una propiedad del `state` en nuestro `store`. Esto accede a esa propiedad del `state`, pero también la muta directamente... lo que nos lleva a la segunda parte de esta lección.

>En la siguiente lección, aprenderemos otras formas en las que podemos mutar el `state` de Pinia.
