# gatsby-plugin-stencil

Gatsby server side rendering for your Stencil web components.

## Install

```
npm install --save gatsby-plugin-stencil
```

## How to use

Add the plugin to your `gatsby-config.js`

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-stencil`,
      options: {
        // The module of your components (required), eg "@ionic/core".
        module: "your-stencil-components"
      }
    }
  ]
};
```
