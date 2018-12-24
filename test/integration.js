const tap = require('tap');
const micro = require('micro');
const request = require('supertest');

const list = micro(require('../endpoints/list.js'));
const download = micro(require('../endpoints/download.js'));

tap.test(() => request(list)
  .get('/list.json')
  .expect(200)
  .expect('Content-Type', /json/));

tap.test(() => request(download)
  .get('/download/apollo.tar.gz')
  .expect(200)
  .expect('Content-Type', /octet-stream/));

tap.test(() => request(download)
  .get('/download/none-exists.tar.gz')
  .expect(404));
