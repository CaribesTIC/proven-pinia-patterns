import{_ as s,c as a,o as n,N as o}from"./chunks/framework.6a8e5212.js";const A=JSON.parse('{"title":"Definiendo la Tienda","description":"","frontmatter":{},"headers":[],"relativePath":"todo-con-pinia/definiendo-la-tienda.md"}'),l={name:"todo-con-pinia/definiendo-la-tienda.md"},p=o(`<h1 id="definiendo-la-tienda" tabindex="-1">Definiendo la Tienda <a class="header-anchor" href="#definiendo-la-tienda" aria-label="Permalink to &quot;Definiendo la Tienda&quot;">​</a></h1><h2 id="tipado-inicial" tabindex="-1">Tipado Inicial <a class="header-anchor" href="#tipado-inicial" aria-label="Permalink to &quot;Tipado Inicial&quot;">​</a></h2><p>Partiremos dejando claro el tipo de información que manejaremos a continuación. Por lo que vamos a crear un archivo para tal definición.</p><p>📃<code>types/todo.ts</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Todo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">done</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">createdAt</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Date</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">updatedAt</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Date</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TodoState</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">items</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Todo</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Tenga en cuenta que partimos definiendo el tipo <code>Todo</code> el cual representa el objeto con las propiedadades de cada tarea. A su vez, definimos <code>TodoState</code> cuya propiedad <code>items</code> declarada es del tipo <code>Todo[]</code>, en otras plalabras, se trata de un arreglo de tareas.</p><h2 id="crear-un-bosquejo-de-la-tienda" tabindex="-1">Crear un Bosquejo de la Tienda <a class="header-anchor" href="#crear-un-bosquejo-de-la-tienda" aria-label="Permalink to &quot;Crear un Bosquejo de la Tienda&quot;">​</a></h2><p>Para definir tienda <code>todo</code> empezaremos creando un bosquejo de la misma.</p><p>Primero importaremos el complemento <code>pinia</code> y también importamos el tipo <code>TodoState</code> para la declaración del <code>state</code>.</p><p>📃<code>stores/todo.ts</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineStore</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pinia</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">TodoState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../types/todo</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> state </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TodoState</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">items</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> []</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> getters </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> actions </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useTodoStore </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineStore</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">todoStore</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,{</span></span>
<span class="line"><span style="color:#A6ACCD;">  state</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  getters</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  actions</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>Tenga en cuenta que hasta ahora solo tenemos una estructura básica de la tienda más el estado inicial de la misma. Ahora, vamos a probar si está funcionando.</p><h2 id="probar-la-definicion-de-la-tienda" tabindex="-1">Probar la Definición de la Tienda <a class="header-anchor" href="#probar-la-definicion-de-la-tienda" aria-label="Permalink to &quot;Probar la Definición de la Tienda&quot;">​</a></h2><p>Para probar si la tienda está definida es necesario crea una instancia de pinia y establecerla como activa. Por ello importamos <a href="https://pinia.vuejs.org/api/modules/pinia.html#setactivepinia" target="_blank" rel="noreferrer">setActivePinia</a> y <a href="https://pinia.vuejs.org/api/modules/pinia.html#createpinia" target="_blank" rel="noreferrer">createPinia</a>.</p><p>También importamos, los correspondientes métodos que aplicaremos en las pruebas:</p><ul><li><a href="https://vitest.dev/api/#aftereach" target="_blank" rel="noreferrer">afterEach</a></li><li><a href="https://vitest.dev/api/#beforeall" target="_blank" rel="noreferrer">beforeAll</a></li><li><a href="https://vitest.dev/api/#beforeeach" target="_blank" rel="noreferrer">beforeEach</a></li><li><a href="https://vitest.dev/api/#describe" target="_blank" rel="noreferrer">describe</a></li><li><a href="https://vitest.dev/api/#expect" target="_blank" rel="noreferrer">expect</a></li><li><a href="https://vitest.dev/api/#test" target="_blank" rel="noreferrer">it</a></li></ul><p>Luego, finalizamos las importaciones con <code>useTodoStore</code>.</p><p>📃<code>stores/__tests__/todo.spec.ts</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createPinia</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setActivePinia</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pinia</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">afterEach</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">beforeAll</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">beforeEach</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">describe</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">expect</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">it</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitest</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useTodoStore</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../todo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">beforeAll</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">setActivePinia</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">createPinia</span><span style="color:#F07178;">())</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">describe</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">useTodoStore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">ReturnType</span><span style="color:#89DDFF;">&lt;typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useTodoStore</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">beforeEach</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">store</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useTodoStore</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">afterEach</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$reset</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">it</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">should creates a store</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">store</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBeDefined</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">it</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">should initializes with empty items</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">store</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">items</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toStrictEqual</span><span style="color:#F07178;">([])</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>Tenga en cuenta que:</p><ol><li><code>setActivePinia(createPinia())</code> se ejecutará antes de que cada prueba se ejecute.</li><li>Declaramos la variable <code>store</code> para ser usada en cada una de las pruebas.</li><li>La asignación de <code>useTodoStore()</code> al <code>store</code> se realizará en cada prueba.</li><li>Al finalizar cada prueba se ejecutará <code>store.$reset()</code> para resetear el <code>store</code>.</li><li>Además de probar que <code>store</code> está definido, también probamos que <code>store.items</code> es un arreglo vacio.</li></ol><p>Ahora ejecutamos las pruebas.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test:unit</span></span></code></pre></div><p>Y las pruebas pasan...</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">DEV</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/vue-todo-pinia-tdd/src</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">✓</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stores/__tests__/todo.spec.ts</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">Test</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Files</span><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">passed</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#FFCB6B;">Tests</span><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">passed</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">at</span><span style="color:#A6ACCD;">  </span><span style="color:#F78C6C;">15</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">47</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">28</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Duration</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">1.73s</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">transform</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">691ms,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">1ms,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">collect</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">198ms,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tests</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">10ms</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PASS</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">Waiting</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">changes...</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#FFCB6B;">press</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">h</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">show</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">help,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">press</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">q</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">quit</span></span></code></pre></div><p>Ahora vamos a las <code>actions</code>...</p>`,26),e=[p];function t(r,c,y,D,i,F){return n(),a("div",null,e)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};