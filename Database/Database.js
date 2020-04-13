var sqlite3 = require('sql.js')

class Database {
    constructor() {
        this.db = new sqlite3.Database();
        // this.db.run("CREATE TABLE testtable (name);");
        this.db.run("CREATE TABLE images (file_path PRIMARY KEY, file_extension, thumbnail_path, thumbnail_extension, mission, camera, geojson);");
    }     
    testinsert(testdata) {
        // Insert testdata argument into testtable
        this.db.run("INSERT INTO testtable VALUES (:name)", {':name':testdata});
        let count = this.db.getRowsModified();
    }

    select(file_path) {
        let images = this.db.exec(`SELECT file_path FROM images WHERE file_path IS \"${file_path}\"`);
        console.log(images);
        return images;
    }

    insert(file_path, file_extension, thumbnail_path, thumbnail_extension, mission, camera, geojson) {
        this.db.run("INSERT INTO images VALUES (:file_path, :file_extension, :thumbnail_path, :thumbnail_extension, :mission, :camera, :geojson);", {
            ':file_path': file_path,
            ':file_extension': file_extension,
            ':thumbnail_path': thumbnail_path,
            ':thumbnail_extension': thumbnail_extension,
            ':mission': mission,
            ':camera': camera,
            ':geojson': geojson
        });
        let count = this.db.getRowsModified();
    }
}
module.exports = Database