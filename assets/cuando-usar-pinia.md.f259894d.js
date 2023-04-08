import{_ as e,c as a,o as s,N as n}from"./chunks/framework.23a4abfb.js";const o="/proven-pinia-patterns/assets/cuado-usar-pinia.414b322d.jpg",b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"cuando-usar-pinia.md"}'),i={name:"cuando-usar-pinia.md"},r=n(`<h2 id="cuando-usar-pinia" tabindex="-1">Cuándo usar Pinia <a class="header-anchor" href="#cuando-usar-pinia" aria-label="Permalink to &quot;Cuándo usar Pinia&quot;">​</a></h2><blockquote><p>Antes de profundizar en las características y patrones de Pinia, aclaremos por qué querría usar Pinia en primer lugar. Especialmente teniendo en cuenta que la Composition API de Vue 3 ya tiene un potente sistema de reactividad incorporado con flexibilidad para compartir el estado.</p></blockquote><h2 id="¿que-quiere-decir-con-esto" tabindex="-1">¿Qué quiere decir con esto? <a class="header-anchor" href="#¿que-quiere-decir-con-esto" aria-label="Permalink to &quot;¿Qué quiere decir con esto?&quot;">​</a></h2><p>Bueno, con la Composition API por sí sola, podemos crear un objeto reactivo para que sirva como una tienda para administrar el estado global y luego importarlo en múltiples componentes:</p><p>📄 store.js</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">reactive</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> store </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reactive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>Tenga en cuenta que estamos usando un archivo JS, que es común para las tiendas (así como para los composables).</p><p>La forma en que funciona el sistema de reactividad de Vue 3 significa que cualquier componente que importe esta tienda puede mutar directamente ese estado global, y cada componente que dependa de este estado actualizará su vista automáticamente.</p><p>Entonces, ¿cuándo es necesaria una biblioteca de gestión estado como Pinia?</p><p>En proyectos más pequeños, es posible que pueda salirse con la suya simplemente usando la Composition API de esta manera.</p><p>Pero aquí hay algunas razones por las que su proyecto podría beneficiarse del uso de Pinia:</p><p>A medida que crece una aplicación, las cosas pueden complicarse. Querremos implementar patrones para la organización. Esto es especialmente importante cuando varias personas trabajan en una aplicación grande. Pinia ayuda a administrar y realizar un seguimiento de cómo se actualizan los datos en una aplicación.</p><p>Si no se siente cómodo con la mutación del estado global en cualquier componente, es posible que desee seguir la práctica de escribir funciones claramente nombradas que puedan mutar el estado. Si está utilizando Pinia, esas funciones se llaman acciones. Una ventaja adicional es que las herramientas de desarrollo de Vue rastrean cada acción de Pinia, lo que nos facilita identificar exactamente qué está causando el cambio de estado en nuestra aplicación.</p><p><img src="`+o+'" alt="cuado-usar-pinia"></p><blockquote><p>Si su aplicación utiliza la <a href="https://vuejs.org/guide/scaling-up/ssr.html" target="_blank" rel="noreferrer">representación del lado del servidor</a>, deberá tener más cuidado con la forma en que administra el estado global. Las aplicaciones SSR inicializan los módulos de la aplicación en el servidor y luego comparten el estado en cada solicitud. Esto podría conducir a vulnerabilidades de seguridad. Pinia se diseñó para que sea más fácil y seguro administrar el estado en las aplicaciones SSR.</p></blockquote><p>Además, Pinia tiene la ventaja de ser muy fácil de usar, especialmente cuando se compara con la biblioteca de administración de estado anterior de Vue, <a href="https://vuex.vuejs.org/" target="_blank" rel="noreferrer">Vuex</a>. Tiene una excelente compatibilidad con <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a> y una experiencia de desarrollador de primera clase; como se mencionó, la integración de herramientas de desarrollo de Pinia hace que sea muy fácil ver dónde y cómo se producen los cambios de estado, lo que le brinda una excelente herramienta para la depuración.</p><p>Como ingenieros, nuestro trabajo es hacer que las cosas funcionen de manera eficiente, escribiendo menos código que haga precisamente lo que necesitamos que haga. El uso de un sistema de administración de estado global como Pinia nos ayuda a lograr esto al permitirnos planificar nuestras aplicaciones en un nivel superior. Esto es especialmente importante para aplicaciones a gran escala con varios miembros del equipo.</p><blockquote><p>Ahora que entendemos por qué Pinia puede ser una gran adición a nuestra aplicación, comenzaremos a aprender sobre un tema muy importante: Options Stores y Setup Stores. Esta es una información realmente crucial, así que te recomiendo que no te la saltes. ¡Nos vemos en la próxima lección!</p></blockquote>',18),t=[r];function l(c,p,d,u,m,y){return s(),a("div",null,t)}const g=e(i,[["render",l]]);export{b as __pageData,g as default};
