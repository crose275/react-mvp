const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

function runSeeder(pool, callback){
    // connect to DB
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.error(err);
            return done();
        }
        // run seed SQL
     
            pool.query(`SELECT COUNT(*) FROM users`, (err, data)=> {
                console.log("number of existing rows ", data.rows[0]['count'])
                if(data.rows[0]['count'] == 0){
                    pool.query(`
                    INSERT INTO users ( first_name, last_name, date_added, user_name, email, password) 
                    VALUES 
                    ('John','Smith', '04-01-2023', 'john', 'john@email.com', 'john1' ),
                    ('Paul', 'Johnson', '04-01-2023', 'paul', 'paul@email.com', 'paul1'),
                    ('Cedrick','Roseberry', '04-01-2023', 'crose275', 'crose275@gmail.com', 'cedrick1')`, 
                    (err, data) => {
                        if (err){
                            console.log("Insert failed");
                            console.error(err)
                        } else {
                            console.log("Seeding complete");
                        }
                    });
                } else {
                    console.log("Did not seed new data because tasks Table was not empty");
                }
                })
            
            // tell pg we are done with this connection, then execute callback to close it
            done();
            callback();
        });
};

runSeeder(pool, () => {
    // seeding is done, so we can close the pool
    // pool.end();
})