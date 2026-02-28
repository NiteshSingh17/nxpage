module.exports = function getNxPageConfig() {
  return {
    server: {
      port: process.env.PORT || 3000,
    },
    build: {
      distDir: ".next",
      includeRoutePatterns: [],
      blockRoutePatterns: [],
    }
  }
};