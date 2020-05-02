const initExec = "initializedExecs"

//These are the default options for all commands
//Hard coded because these shouldn't change (much, if at all)
//after being set
//[task, command]
const thumbnails = ["Thumbnails", "gdal_translate -ot Byte -of JPEG -scale 0 4095 0 255 -outsize 5% 5% {} {}"];
const imgEXT = ["imageExt", ".jpeg"];
const externalViewer = ["externalViewer", "C:\\Program Files (x86)\\Windows Media Player"];

//Initializes localStorage with default commands for things such as
//creating thumbnails with GDAL.
function init() {
    try {
        localStorage.setItem(initExec, "true");
        localStorage.setItem(thumbnails[0], thumbnails[1]);
        localStorage.setItem(imgEXT[0], imgEXT[1]);
        localStorage.setItem(externalViewer[0], externalViewer[1]);

        return true;
    } catch(err) {
        console.error(err.message);
        console.error("Client/src/Tools/initLocStorage.js - init()");
        return false;
    }
}

//flase - Check if localStorage is initialized or not and runs init()
//true - run init() and reset all settings
function initLocStorage(bool) {
    if (bool === true) {
        return init();
    }
    else {
        let temp = localStorage.getItem(initExec);
        if (temp == null) {
            return init();
        }
    }

    return false;
}

//retreive current options for a specific task
function getLocStorage(toRetreive) {
    return localStorage.getItem(toRetreive[0]);
}

function setLocStorage(toSet, data) {
    try {
        localStorage.setItem(toSet[0], data);
        return true;
    }
    catch(err) {
        console.error(err.message);
        console.error("Client/src/Tools/initLocStorage.js - setLocStorage()");
        return false;
    }
}

//export constants for other functions to be able to access the options
export {initLocStorage, getLocStorage, setLocStorage, thumbnails, imgEXT, externalViewer};