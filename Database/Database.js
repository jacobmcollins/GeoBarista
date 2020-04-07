var sqlite3 = require('sqlite3').verbose()

class Database {
    constructor() {
        // Create new db in memory
        this.db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log('Connected to the in-memory SQlite database.');
            }
        });     
        // Must wrap sequential queries in serialize() or they will be processed in random order!! 
        // Equivalent to a cursor object
        this.db.serialize(() => {
            // Query table schema (should be empty) 
            this.db.all("select name from sqlite_master where type='table'", function (err, tables) {
                console.log("Printing all tables in schema: ");
                tables.forEach((table) => {
                    console.log("\ttable name: " + table.name);
                });
            });
            // Add an empty test table 
            this.db.all("CREATE TABLE testtable(name text)", function (err, response) {
                if (err) console.log(err);
                console.log("Inserted testtable into schema");
                console.log(response);
            });
            // Query table schema (should have test table in it) 
            this.db.all("select name from sqlite_master where type='table'", function (err, tables) {
                if (err) console.log(err);
                console.log("Printing all tables in schema: ");
                tables.forEach((table) => {
                    console.log("\ttable name: " + table.name);
                });            
            });
            /*
            // Delete test table
            this.db.all("DROP TABLE testtable", function (err) {
                if (err) console.log(err);
                console.log("Test table deleted");
            });
            // Query table schema (should be empty) 
            this.db.all("select name from sqlite_master where type='table'", function (err, tables) {
                if (err) console.log(err);
                console.log("Printing all tables in schema: ");
                tables.forEach((table) => {
                    console.log("\ttable name: " + table.name);
                });            
            });
            */
        });
            
        //this.db.close();
    }     
    testinsert(testdata) {
        this.db.serialize(() => {
            // Insert testdata argument into testtable
            this.db.run("INSERT INTO testtable(name) VALUES(?)", [testdata], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Row inserted into testtable with value " + testdata);
            });
        })
    }
}
module.exports = Database