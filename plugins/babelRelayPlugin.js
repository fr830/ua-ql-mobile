const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../data/schema.json');
console.log('babel relay plugin !!!',schema.data);
module.exports = { plugins: [getBabelRelayPlugin(schema.data)] };