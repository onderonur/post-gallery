const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    ["/auth", "/graphql"],
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    }),
  );
};
