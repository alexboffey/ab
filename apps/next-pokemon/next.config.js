module.exports = {
  // Will only be available on the server side
  serverRuntimeConfig: {},
  // Will be available on both server and client
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    WS_URL: process.env.WS_URL,
  },
};
