var sqlite3 = require('sql.js')

class Database {
    constructor() {
        this.db = new sqlite3.Database();
        this.db.run("CREATE TABLE testtable (name);");
    }     
    testinsert(testdata) {
        // Insert testdata argument into testtable
        this.db.run("INSERT INTO testtable VALUES (:name)", {':name':testdata});
        let count = this.db.getRowsModified();
        console.log("count " + count )
    }
}
module.exports = Database