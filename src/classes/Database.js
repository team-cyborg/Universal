/* eslint-disable no-console */
const fs = require('fs');

class Database {
      #file_pattern;

      #file;

      constructor(file) {
            this.#file_pattern = /\w+.json/;
            
            if (!this.#file_pattern.test(file)) throw new TypeError('File must be in JSON format');

            if (!fs.existsSync(file)) {
                  fs.writeFileSync(file, '{}');
                  this.#file = file;
            } else this.#file = file;
      }

      async set(key, value) {
            if (typeof key !== 'string' || key === '') throw new TypeError('Invalid key provided.');
            const item = JSON.parse(fs.readFileSync(this.#file, 'utf-8'));

            item[key] = value;

            try {
                  fs.writeFileSync(this.#file, JSON.stringify(item));
            } catch (error) {
                  console.log(error);
            }
      }

      async all() {
            const databaseFile = fs.readFileSync(this.#file, 'utf-8');
            const data = JSON.parse(databaseFile);
            return data;
      }

      async delete(key) {
            if (typeof key !== 'string' || key === '') throw new TypeError('Invalid key provided.');
            const item = JSON.parse(fs.readFileSync(this.#file, 'utf-8'));

            if (Object.prototype.hasOwnProperty.call(item, key)) {
                  try {
                        const rm = key;
                        const { [rm]: r, ...rest } = item;

                        fs.writeFileSync(this.#file, JSON.stringify(rest));
                        return true;
                  } catch (error) {
                        console.log(error);
                        return false;
                  }
            } else return false;
      }

      get(key) {
            if (typeof key !== 'string' || key === '') throw new TypeError('Invalid key provided.');
            const item = JSON.parse(fs.readFileSync(this.#file, 'utf-8'));

            if (Object.prototype.hasOwnProperty.call(item, key)) {
                  const data = item[key];
                  return data;
            }
            
            return null;
      }

      async clear() {
            const clean = {};
            try {
                  await fs.writeFileSync(this.#file, JSON.stringify(clean));
                  return true;
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }

      has(key) {
            if (typeof key !== 'string' || key === '') throw new TypeError('Invalid key provided.');
            const item = JSON.parse(fs.readFileSync(this.#file, 'utf-8'));

            if (Object.prototype.hasOwnProperty.call(item, key)) return true;
            
            return false;
      }
      
      async push(key, value) {
            const item = JSON.parse(fs.readFileSync(this.#file, 'utf-8'));
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                  if (!Array.isArray(item[key])) {
                        if (item[key] !== undefined || item[key] !== null) throw new TypeError('Element is not an Array.');

                        item[key] = [];
                        item[key].push(value);

                        try {
                              await fs.writeFileSync(this.#file, JSON.stringify(item));
                              return true;
                        } catch (error) {
                              console.log(error);
                              return false;
                        }
                  }

                  item[key].push(value);
                  
                  try {
                        await fs.writeFileSync(this.#file, JSON.stringify(item));
                        return true;
                  } catch (error) {
                        console.log(error);
                        return false;
                  }
            }

            item[key] = [];
            item[key].push(value);

            try {
                  await fs.writeFileSync(this.#file, JSON.stringify(item));
                  return true;
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }

      async remove(key, value) {
            const item = JSON.parse(fs.readFileSync(this.#file, 'utf-8'));

            if (!Object.prototype.hasOwnProperty.call(item, key)) return true;

            if (!Array.isArray(item[key])) throw new TypeError('Element is not an Array');

            item[key] = item[key].filter((i) => i !== value);

            try {
                  await fs.writeFileSync(this.#file, JSON.stringify(item));
                  return true;
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }
}

module.exports.Database = Database;