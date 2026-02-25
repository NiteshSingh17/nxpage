const { createNxPageServer } = require("nxpage");

createNxPageServer({
  port: process.env.PORT || 3000,
});
