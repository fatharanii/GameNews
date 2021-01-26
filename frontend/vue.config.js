require = require('esm')(module);
const { routes } = require('./src/routes.js');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    sitemap: {
        baseURL: 'https://amuspheregg.herokuapp.com',
        routes,
    }
  }
}