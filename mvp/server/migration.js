const { Pool } = require('pg');
const dbConn = require('./dbConn')

const pool = dbConn.getPool();

function runMigrations(pool, callback) {
  pool.connect((err, client, done) => {
    if (err) {
      console.log("Failed to connect");
      console.error(err);
      return done();
    }
    //run migration SQL
    pool.query(
      `CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            first_name VARCHAR(150),
            last_name VARCHAR(150),
            date_added date,
            user_name VARCHAR(50),
            email VARCHAR(50),
            password VARCHAR(50)
            );`, (err, data) => {
                if(err){
                    console.log("CREATE TABLE users failed");
                    console.error(err)
                } else {
                    console.log("Users table created successfully");
                }

                done();
                callback()
            }
    );
  });
}

runMigrations(pool, ()=>{
    pool.end();
})
