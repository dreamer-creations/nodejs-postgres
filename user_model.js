const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_sample',
  password: 'root',
  port: 5432,
});

const getUser = (query) => {
  const { username, password } = query;
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT * FROM users WHERE user_name=$1 and password=$2;`, [username, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  })
}

const createUser = (userdata) => {
  return new Promise(function (resolve, reject) {
    pool.query(`INSERT INTO users (user_id, user_name, email_id, password, status_id, last_updated) VALUES ('${userdata.id}', '${userdata.name}', '${userdata.email}', '${userdata.password}', '${userdata.status}', '${userdata.updatetime}');`, [],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
  })
}

module.exports = {
  getUser,
  createUser
};