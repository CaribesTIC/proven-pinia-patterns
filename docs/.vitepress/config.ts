import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Patrones Probados',
  description: 'de Pinia',
  base: '/proven-pinia-patterns/',
  themeConfig: {
    logo: '/caribestic.png',
    siteTitle: 'Patrones de Pinia',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comenzar', link: '/intro' },
      { text: 'CaribesTIC', link: 'https://caribestic.github.io/' },      
    ],
    sidebar: [{
      text: 'Comenzar',   // required
      path: '/',      // optional, link of the title, which should be an absolute path and must exist        
      sidebarDepth: 1,    // optional, defaults to 1
      collapsible: true,
      collapsed: false, 
      items: [
        { text: 'Introducción', link: '/intro' },
        { text: 'Cuándo usar Pinia', link: '/cuando-usar-pinia' },   
        { text: 'Options vs Setup Stores', link: '/options-vs-setup' },  
        { text: 'Tiendas Modulares', link: '/modular-stores' },
        { text: 'Accediendo al Estado', link: '/accessing-state' },
        { text: 'Mutando el Estado', link: '/mutating-state' },
        { text: 'Complementos de Pinia', link: '/pinia-plugins' },
              
      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CaribesTIC/proven-pinia-patterns' }
    ]
  }
})
