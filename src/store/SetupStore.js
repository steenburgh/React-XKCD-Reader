if (process.env.NODE_ENV === "production") {
  module.exports = require("./SetupStore.prod");
} else {
  module.exports = require("./SetupStore.dev");
}
