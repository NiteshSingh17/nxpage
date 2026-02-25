module.exports = function getNxPageConfig() {
  return {
    server: {
          port: 3000,
    },
    build: {
        distDir: ".next",
        includeRoutePatterns: [],
        blockRoutePatterns: [],
    }
  }
};