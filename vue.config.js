module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: process.env.NODE_ENV === 'production'
  ? '/todo-spa-vue-deploy/'
  : '/'
}
