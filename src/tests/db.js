/* eslint-disable no-console */
const { Database } = require('../src/classes/Database');

const db = new Database('test_db.json');

db.set('db', { dbname: 'name', dbid: 'dbid', dbuserarr: [] });

(async () => {
      const x = await db.get('db');
      console.log(x.dbarr);
      console.log(await db.push('db.dbarr', 'x'));
})();