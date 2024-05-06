import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/base/',
  title: "Fuelup.cc",
  description: "Fuel China Community",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Resources', link: 'https://fuellabs.notion.site/Awesome-Fuel-7b4ca6b262d3414a9968f275cba43fc9' },
      {
        text: "版本",
        items: [
         { text: "v0.0.1", link: "" },
         { text: "v0.0.2", link: "" },
         { text: "v0.0.3", link: "" },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/Introduction/Getting Started' },
          { text: 'The Fuel Toolchain', link: '/Introduction/The Fuel Toolchain' },
          { text: 'A Forc Project', link: '/Introduction/A Forc Project' },
          { text: 'Standard Library', link: '/Introduction/Standard Library' }
        ]
      }
      ,

      {
        text: 'Example',
        collapsed: false,
        items: [
          { text: 'Counter', link: '/Introduction/Standard Library' },
          { text: 'FizzBuzz', link: '/Introduction/A Forc Project' },
          { text: 'Wallet Smart Contract', link: '/Introduction/The Fuel Toolchain' },
          { text: 'Liquidity Pool Example', link: '/Introduction/Getting Started' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '' },
      { icon: 'discord', link: '' }
    ]
  }
})

