const micro = require('micro');
const extract = require('../lib/extract.js');
const summary = require('../lib/summary.js');

module.exports = async (req, res) => {
  await extract('https://github.com/zeit/now-examples/archive/master.zip', '/tmp');

  const exampleList = summary('/tmp/now-examples-master');

  micro.send(res, 200, exampleList);
};
