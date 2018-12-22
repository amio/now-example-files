/**
 * Download zip and extract to target directory
 */

const got = require('got');
const unzip = require('unzip-stream');
const { createError } = require('micro');

module.exports = (sourceUrl, targetPath) => new Promise((resolve, reject) => {
  got.stream(sourceUrl)
    .pipe(unzip.Extract({ path: targetPath }))
    .on('close', resolve)
    .on('error', err => reject(createError(500, 'Failed extracting from github.', err)));
});
