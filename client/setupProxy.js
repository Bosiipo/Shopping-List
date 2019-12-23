const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://guarded-anchorage-96530.herokuapp.com',
      changeOrigin: true
    })
  );
};

// http://localhost:5000

// "build-babel": "babel -d ./build server.js -s",
// "build": "npm run clean && npm run build-babel",
// NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client
// npm install --prefix client && npm install && npm run build
