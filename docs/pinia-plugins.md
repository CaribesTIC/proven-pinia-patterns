# Complementos de Pinia

>Terminaremos este tutorial echando un vistazo a una herramienta importante que puede ayudarnos a expandir la funcionalidad de Pinia: los
complementos.

Un complemento es una forma de extender una API para que pueda hacer cosas más allá de lo que viene de fábrica. Es imposible anticipar todas las necesidades posibles que tendrá un desarrollador que trabaja con Pinia, pero dado que podemos crear complementos, podemos agregar a Pinia para que pueda satisfacer nuestras necesidades aún mejor.

## Cuándo escribir un complemento

Si tenemos una lógica que queremos reutilizar, como una función de utilidad que ayuda a validar que una fecha tiene el formato correcto, podemos crear composables para hacerlo.

Pero si la funcionalidad que necesitamos depende del propio Pinia, es posible que debamos escribir un complemento de Pinia.

>Podemos crear una función de complemento que le dé más funcionalidad a Pinia:

```js
export function myPiniaPlugin() {
  // do something to extend Pinia in some way
}
```

Y luego le decimos a Pinia que use el complemento pasándolo a nuestra instancia de Pinia en el archivo `main.js` con `pinia.use()`.

```js
pinia.use(myPiniaPlugin)
```

Pinia does something helpful for us when it adds the plugin to our Pinia instance. When we add a plugin with .use(), Pinia also takes the opportunity to add extra information about our Pinia instance and our app that could be helpful to us. This is called the context.

>Pinia hace algo útil para nosotros cuando agrega el complemento a nuestra instancia de Pinia. Cuando agregamos un complemento con `.use()`, Pinia también aprovecha la oportunidad para agregar información adicional sobre nuestra instancia de Pinia y nuestra aplicación que podría sernos útil. Esto se llama el contexto.

Pinia asigna el objeto de `context` a nuestro complemento para que podamos acceder a todas las propiedades que podamos necesitar al crear más funciones en Pinia.

```js
export function myPiniaPlugin(context) {
  context.pinia // the pinia instance created with `createPinia()`
  context.app // the current app created with `createApp()` (Vue 3 only)
  context.store // the store the plugin is augmenting
  context.options // the options object defining the store passed to `defineStore()`
  // ...
}
```

Cuando se trata de crear nuestros propios complementos, el cielo es realmente el límite. Pero por hoy, echemos un vistazo a tres patrones útiles para crear uno:

- Un complemento para agregar una propiedad o método a una tienda
- Un complemento que se ejecuta cuando ocurre una mutación o evento
- Un complemento que agrega una nueva opción a la tienda (como `state`, `actions`, `getters`, `ourPlugin`)

## Agregar una propiedad o método a una tienda

Podemos agregar una propiedad a la tienda escribiendo un complemento simple que devuelva una propiedad de mensaje.

`📄 main.js`
```js
function pluginProperty() {
  return {
    message: "Just a simple string",
  };
}

pinia.use(pluginProperty);
```

>Observe cómo estamos en `main.js` y le indicamos a Pinia que `use()` el complemento que acabamos de crear.

De manera similar, podemos usar un complemento para agregar un método a una tienda.

Tenga en cuenta que tenemos acceso a ese argumento de contexto si lo necesitamos. Entonces, escribamos un complemento simple que devuelva una función que registre un `console.log` con el objeto `context`.

Esta vez, escribiremos el complemento dentro de un nuevo archivo dentro de un directorio de complementos en el directorio de tiendas de nuestro proyecto.

`📄 /stores/plugins/pluginMethod.js`
```js
function pluginMethod(context) {
  return {
    logContext: function () {
      console.log(context);
    },
  };
}
```

Luego necesitaremos importar ese complemento y decirle a Pinia que lo use:

`📄 main.js`
```
// import the plugin from ./stores/plugins

pinia.use(pluginMethod);
```

Ahora que el método de este complemento está disponible para Pinia, usémoslo en la tienda de autenticación, registrando el objeto de `context` cada vez que alguien se autentica en nuestra aplicación.

`📄 src/stores/auth.js`
```js
async login(username, password) {
  this.logContext(); // here's the method from the plugin    
  const body = { username, password };
  myFetch("login", "POST", body).then((res) => {
  this.user = res.response.value.user
  });
},
```

En las **devtools**, podemos ver que la propiedad y el método están disponibles en la tienda en la sección **customProperties**.

Podemos usarlas en nuestras tiendas según sea necesario.

![pinia-plugins](./img/pinia-plugins-1.jpg)

>Complemento para ejecutar cuando ocurre una Mutación o Acción

Ahora echemos un vistazo a cómo podemos escribir un complemento que se base en la API de Pinia.

## $subscribe

>En este primer ejemplo, escribiremos un complemento que utilice el método auxiliar `$subscribe` de Pinia.

El método `$subscribe` es similar al `watch` de Vue. Podemos usarlo para suscribirnos o vigilar mutaciones, de modo que cuando ocurra una mutación en particular, podamos realizar un efecto secundario.

En este ejemplo, vamos a suscribirnos a las mutaciones en la tienda de autenticación. Queremos saber si el propietario del sitio web inicia sesión. Si lo hace, activaremos una alerta para saludar a ese propietario.

`📄 greetOwnerPlugin.js`
```js
export function greetOwnerPlugin(context) {
  context && context.store.$subscribe((mutation, state) => {
    if (mutation.storeId === "auth") {
      if (state.user && state.user.username === "srodg") {
        alert("The owner is logged in.");
      }
    }
  });
}
```

Usamos o extendemos Pinia con el complemento en el archivo `main.js`:

`📄 main.js`
```js
pinia.use(greetOwnerPlugin);
```

Un complemento se ejecutará cada vez que se cree una tienda, por lo que se ejecutará cada vez que se cree la tienda de `auth`, pero también se ejecutará cada vez que se creen las otras tres tiendas en nuestro proyecto (tienda de `geolocation`, tienda de `favorites` y tienda de `restaurants`). Sin embargo, solo nos preocupamos por las mutaciones en la tienda de `auth`.

El método `$subscribe` nos da acceso a la mutación por su `storeId`, por lo que podemos decirle al complemento que envíe una alerta cuando ocurra la acción relevante en la tienda de `auth`.

Ahora, cuando inicio sesión, la aplicación me saluda con el `alert` (¡ya que soy el propietario!).

![pinia-plugins](./img/pinia-plugins-2.jpg)

Si bien esta función de `alert` es un poco artificial, podríamos extender este complemento para ejecutar una acción específica solo cuando un administrador del sitio inicia sesión, como para obtener algunos datos protegidos.

## Usando `$onAction` en complementos

Ya hemos visto el método **helper** `$onAction` en este tutorial. Cuando se trata de complementos de Pinia, podemos usar `$onAction` para lograr un comportamiento especial con acciones, como:

- Ejecutar código antes de que se ejecute una **Acción**
- Ejecutar código después de que se haya ejecutado una **Acción**
- Ejecutar código cuando falla una **Acción**
- Cancelar una **Acción**

Escribamos un complemento que use `$onAction` para hacer algo dependiendo de si un usuario inicia sesión, cierra sesión o se registra.

En este ejemplo, el método `$onAction` observa todas las acciones de Pinia y, si ocurre una en el **store** de `auth`, comprueba qué acción es. Basado en esa acción, enviará una alerta.

`📄 greetUserPlugin.js`
```js
export function greetUserPlugin({ store }) {
  store.$onAction((action) => {
    if (store.$id === "auth") {
      switch (action.name) {
        case "login":
          alert("Welcome back to Pinia Restaurants!");
          break;
        case "logout":
          alert("Hope you enjoyed Pinia Restaurants!");
          break;
        case "register":
          alert("Welcome to Pinia Restaurants!");
          break;
      }
    }
  });
}
```
>Ahora vamos a probarlo en el navegador.

## Agregar el gancho posterior

Para llevar este complemento un poco más allá, incluso podríamos usar el **hook** `after` para asegurarnos de que el `alert` aparezca solo una vez que se complete la acción. En el siguiente ejemplo, deconstruimos el nombre y el método del objeto de `context`.


`📄 greetUserPlugin.js`
```js
export function greetUserPlugin({ store }) {
  store.$onAction(({ name, after }) => { // deconstruct off context obj
    if (store.$id === "auth") {
      switch (name) {
        case "login":
          after(() => {
            alert("Welcome back to Pinia Restaurants!");
          });
          break;
        case "logout":
          after(() => {
            alert("Hope you enjoyed Pinia Restaurants!");
          });
          break;
        case "register":
          after(() => {
            alert("Welcome to Pinia Restaurants!");
          });
          break;
      }
    }
  });
}
```

## Un Caso de Uso Elegante

>Otro caso de uso genial para `$onAction` es esta elegante solución presentada por [Eduardo San Martín Morote](https://github.com/posva), creador de Pinia.

`📄 main.js`
```js
export function ({ store }) => {
  store.$onAction(({ name, store, args, after, onError }, state) => {
    onError(error => {
      sendErrors(name, args, error)
    })
  })
})
```

Este complemento se puede usar para tomar errores que ocurren dentro de **Acciones** y enviarlos a un servicio externo que use, como [Sentry](https://sentry.io/welcome/). Esto es muy útil para detectar errores durante la producción.

## Agregar una opción a la tienda

>El último patrón que veremos es interesante porque nos permite enviar datos desde una tienda directamente a un complemento.

Podemos añadir una **“option”** a una tienda. Cuando digo **“option”** en relación con Vue, me refiero a las propiedades disponibles en la instancia de Vue, como `data`, `computed` y `methods` en la **Options API**.

O en una **Options Store** de Pinia, las opciones se refieren al `state`, `getters` o `actions`.

Si creamos nuestra propia opción en una tienda Pinia, podemos añadir propiedades a esa opción.

`📄 src/stores/auth.js`
```js
export const useAuthStore = defineStore("auth", {
  state: () => ({
    // ... 
  }),
  getters: {
    // ...
  },
  actions: {
    // ...
  },
  greeting: {
    enabled: true,
  },
});
```

In the example, the option we have created is called greeting. We’re adding a property called enabled so that we can send either true or false to the plugin. Based on that boolean, we will turn the plugin on or off.

En el ejemplo, la opción que hemos creado se llama `greeting`. Estamos agregando una propiedad llamada `enabled` para que podamos enviar `true` o `false` al complemento. Según ese valor booleano, activaremos o desactivaremos el complemento.

Así es como se podría construir ese complemento:

`📄 stores/plugins/greetUserPlugin.js`
```js
export function greetUserPlugin({ store, options }) {
  if (options.greeting && options.greeting.enabled) {
    store.$onAction((action) => {
      switch (action.name) {
        case "login":
          alert("Welcome back to Pinia Restaurants!");
          break;
        case "logout":
          alert("Hope you enjoyed Pinia Restaurants!");
          break;
        case "register":
          alert("Welcome to Pinia Restaurants!");
          break;
      }
    });
  }
}
```

La instrucción `if (options.greeting && options.greeting.enabled)` se basa en que la propiedad `enabled` se establece en `true`.

Si se establece en `false`, el complemento no ejecutará la lógica, por lo que el método `$onAction` no observará todas las acciones de Pinia.

Podríamos establecer propiedades en la opción para cualquier dato que queramos que nuestro complemento pueda usar.

## Adición de una Option a las Setup Stores

Por cierto, también podemos crear opciones para los complementos de Pinia en una **setup store**. Hacemos eso agregando la opción como tercer argumento al escribir la función de **setup** para la tienda:

`📄 src/stores/auth.js`
```js
defineStore('auth',() => {...},
  {
    greeting: {
      enable: true,
    },
  }
)
```
>Un útil complemento de código abierto


Como puede imaginar, esto tiene mucho potencial para ser útil al desarrollar complementos de código abierto para otros desarrolladores de Vue que usan Pinia.

>Realmente hay tantas posibilidades de lo que podemos hacer al crear nuestros propios complementos. La comunidad de código abierto de Vue está comenzando a crear complementos útiles que se comparten, así que manténgase atento a las interesantes mejoras que crearán los desarrolladores.

Por ejemplo, veamos el complemento público simple pero efectivo llamado `pinia-plugin-persistedstate`.

Como parece, es un complemento de Pinia que nos permite conservar nuestro estado a pesar de un refrescamiento del navegador.

Para utilizarlo, lo instalaríamos en nuestro proyecto.

```sh
npm : npm i pinia-plugin-persistedstate
yarn : yarn add pinia-plugin-persistedstate
```

Luego impórtalo a `main.js` y decir a Pinia que lo use.

`📄 main.js`
```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

Luego, debemos asegurarnos de agregar la opción `persist:true` a la tienda que queremos que persista:

```js
import { defineStore } from 'auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      someState: 'hello pinia',
    }
  },
  persist: true,
})
```

Como puede ver en el navegador, ahora nuestro estado se mantiene.

## Conclusión del Tutorial

¡Realmente espero que hayas disfrutado este tutorial sobre Patrones Probados de Pinia!

>Pinia es una biblioteca tan flexible que puede adaptarse a tus necesidades. Conocer una variedad de patrones diferentes que podemos usar nos ayudará a sacar el máximo provecho de Pinia para todo tipo de proyectos de Vue.

**¡Gracias por ver!**
