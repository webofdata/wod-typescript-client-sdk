const WoD = require("./webofdata.js");

window.makeWoDClient = function(url) {
    return new WoD.Client(url);
}



