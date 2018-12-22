const fs = require('fs');
const url = require('url');
const tar = require('tar-fs');
const micro = require('micro');
const route = require('path-match')();
const extract = require('../lib/extract.js');

const TMP_DIR = '/tmp';

module.exports = async (req, res) => {
  const match = route('/download/:example.tar.gz');
  const params = match(url.parse(req.url).pathname);
  if (!params) return micro.send(res, 404);

  await extract('https://github.com/zeit/now-examples/archive/master.zip', TMP_DIR);

  const expected = `${TMP_DIR}/now-examples-master/${params.example}`;
  if (!fs.existsSync(expected)) {
    return micro.send(res, 404);
  }

  return micro.send(res, 200, tar.pack(expected));
};
