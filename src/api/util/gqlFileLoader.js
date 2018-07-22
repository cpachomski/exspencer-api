const fs = require('fs');
const path = require('path');

const loadGqlFile = resource => {
  const filePath = path.join(__dirname, '../models', resource);
  return fs.readFileSync(filePath, 'utf-8');
};

module.exports = loadGqlFile;
