const fs = window.require('fs');
const path = window.require('path');

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
const copyFile = (srcPath, destPath, destFileName) => {
    var dest = path.join(destPath, destFileName);
    if (fs.existsSync(srcPath)) {
        fs.copyFile(srcPath, dest, (err) => {
            if (err) {
                alert("An error ocurred copyinging the file" + err.message);
                console.log(err);
                return;
            }
            console.log("File succesfully copyed");
        });
    } else {
        alert("This file doesn't exist, cannot copy");
    }
}
const moveFile = (srcPath, destPath, destFileName) => {
    var dest = path.join(destPath, destFileName);
    if (fs.existsSync(srcPath)) {
        fs.rename(srcPath, dest, (err) => {
            if (err) {
                alert("An error ocurred moving the file" + err.message);
                console.log(err);
                return;
            }
            console.log("File succesfully moved");
        });
    } else {
        alert("This file doesn't exist, cannot move");
    }
}
// returns true if the file exists at the destination 
const checkOverwrite = (destPath, destFileName) => {
    var dest = path.join(destPath, destFileName);
    return fs.existsSync(dest);
}
const fileManipulation = { deleteFile, copyFile, moveFile, checkOverwrite };
export default fileManipulation;