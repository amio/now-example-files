/**
 * Get example list from extracted folder
 */

const { join } = require('path');
const { lstatSync, readdirSync } = require('fs');

const isDotFile = name => name.startsWith('.');
const isDirectory = path => lstatSync(path).isDirectory();

module.exports = source => readdirSync(source)
  .filter(name => !isDotFile(name))
  .filter(name => isDirectory(join(source, name)));
