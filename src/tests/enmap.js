/* eslint-disable no-console */
const Enmap = require('enmap');

const database = new Enmap({ name: 'db', dataDir: './tests' });

database.set('db1', { dbname: 'dbname', dbid: 'dbid', dbarr: [] });
database.push('db1', 'arr1', 'dbarr');
console.log(database.get('db1'));