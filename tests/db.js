const { Database } = require('../src/classes/Database');

const db = new Database('finalDB.json');

db.set('name', 'samarth');
db.set('info', { age: 18, hobby: 'coding' });
db.set('arr', []);