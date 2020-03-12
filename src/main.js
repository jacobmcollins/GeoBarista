// Requires
const { Controller } = require('./src/controller/Controller.js');

// Main entry point
function main() {
    controller = new Controller('map');
}

main();

function openNav() {
    document.getElementById("AsideSection").style.width = "35%";
    document.getElementById("main").style.marginRight = "35%";
    document.getElementById("main").style.width = "65%";
    document.getElementById("openAsideSection").style.visibility = "hidden";
}

function closeNav() {
    document.getElementById("AsideSection").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("main").style.width = "100%";
    document.getElementById("openAsideSection").style.visibility = "visible";
}