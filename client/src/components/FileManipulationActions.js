const fs = window.require('fs');

const deleteFile = (filepath) => {
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (err) => {
            if (err) {
                alert("An error ocurred deleting the file" + err.message);
                console.log(err);
                return;
            }
            console.log("File succesfully deleted");
        });
    } else {
        alert("This file doesn't exist, cannot delete");
    }
}

const fileManipulation = { deleteFile };
export default fileManipulation;