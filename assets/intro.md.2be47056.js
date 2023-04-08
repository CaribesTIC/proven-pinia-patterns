import{_ as e,c as a,o,N as r}from"./chunks/framework.23a4abfb.js";const _=JSON.parse('{"title":"Introducción","description":"","frontmatter":{},"headers":[],"relativePath":"intro.md"}'),i={name:"intro.md"},s=r('<h1 id="introduccion" tabindex="-1">Introducción <a class="header-anchor" href="#introduccion" aria-label="Permalink to &quot;Introducción&quot;">​</a></h1><blockquote><p>Bienvenido a Patrones Probados de Pinia, donde exploraremos los patrones de nivel profesional que querrá saber cuando utilice la biblioteca de administración de estado de Vue en producción. Veremos las mejores prácticas para usar Pinia en sus aplicaciones y las aplicaremos a escenarios comunes.</p></blockquote><div class="warning custom-block"><p class="custom-block-title">advertencia</p><p>Este tutorial requiere tener en cuenta los conceptos básicos de <a href="https://pinia.vuejs.org/" target="_blank" rel="noreferrer">Pinia</a></p></div><p>En Patrones Probados de Pinia, examinaremos algunas de las reglas de Pinia (la forma requerida de hacer las cosas), pero también veremos algunos de los patrones (la forma recomendada de usar Pinia para mejorar sus aplicaciones); Organizado, más claro y súper eficiente.</p><p>Veremos un proyecto de ejemplo para conocer algunas de las reglas y patrones en el contexto de una aplicación real. El proyecto de ejemplo utiliza Pinia, Vue Router, la API de Google Maps y la biblioteca Vue Use de componibles.</p><p>No lo construiremos de principio a fin, pero lo usaremos para observar más de cerca cómo se puede usar Pinia en una aplicación que tiene varios flujos de datos que deben compartirse en toda la aplicación.</p><p>Echemos un vistazo a lo que hace el proyecto de ejemplo. Es un buscador de restaurantes; escriba la ciudad y el término de búsqueda para encontrar restaurantes dentro de un área determinada. El usuario puede registrar una cuenta para poder guardar sus favoritos. Y pueden leer información extraída de la API de Google Maps, como calificaciones y reseñas.</p><p>Esta aplicación rastrea su estado global para cada preocupación lógica dentro de su propia tienda Pinia:</p><p>Las tiendas incluyen:</p><ul><li>Autenticación del usuario</li><li>Geolocalización para identificar la ubicación del usuario actual o la ubicación que escriben en la barra de entrada de la ciudad</li><li>Datos sobre los restaurantes que se recuperan en su búsqueda</li><li>Datos de favoritos de los usuarios a medida que agregan sus restaurantes favoritos a su lista de favoritos</li></ul><p>Además de ver cómo podemos organizar nuestras tiendas Pinia, también aprenderemos sobre dos tipos diferentes de tiendas que podemos crear: <strong>Options vs Setup Stores</strong>. Y aprenderemos sobre cómo acceder y actualizar el estado a través de nuestra aplicación.</p><p>Finalmente, exploraremos más características únicas que vienen con Pinia, como <code>$patch</code>, <code>$reset</code> y complementos de Pinia, que podemos construir desde cero.</p><blockquote><p>Ahora que tenemos una mejor idea de hacia dónde nos dirigimos, tomemos un minuto para hablar sobre por qué elegiríamos usar Pinia cuando la Compositino API de Vue 3 ya tiene un poderoso sistema de reactividad integrado con flexibilidad para compartir el estado. Si te has estado preguntando si Pinia es siquiera necesaria, lo abordaré en la próxima lección. ¡Empecemos!</p></blockquote>',13),n=[s];function t(c,d,l,u,p,m){return o(),a("div",null,n)}const f=e(i,[["render",t]]);export{_ as __pageData,f as default};
