let mongoDBPath = "mongodb://localhost/webd6201";
let sessionSecret = "someSecret";

// Various ways to export modules -> can be broken up individually
module.exports = {
  Path: mongoDBPath,
  Secret: sessionSecret,
}