const initExec = "initializedExecs"

//These are the default options for all commands
//Hard coded because these shouldn't change (much, if at all)
//after being set
//[task, command]
const thumbnails = ["Thumbnails", "echo I don't know the command"];

//Initializes localStorage with default commands for things such as
//creating thumbnails with GDAL.
function init() {
    try {
        localStorage.setItem(initExec, "true");
        localStorage.setItem(thumbnails[0], thumbnails[1]);
        return true;
    } catch(err) {
        console.error(err.message);
        console.error("Client/src/Tools/initLocStorage.js - init()");
        return false;
    }
    return false;
}

//flase - Check if localStorage is initialized or not and runs init()
//true - run init() and reset all settings
function initLocStorage(bool) {
    if (bool == true) {
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

//export constants for other functions to be able to access the options
export {initLocStorage, getLocStorage, thumbnails};