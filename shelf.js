var diacritics = require('diacritics');
var fs = require('fs');
var os = require('os');

// console.log(os.homedir());

function Library(path) {
  if (path === undefined) {
    console.log("No path given, assuming defaut location");
    var home = process.env.HOME || process.env.USERPROFILE;
    path = home + "/.pandoc";
  }
  this.path = path;
  console.log("Using path: " + this.path);

  // Build the path for records, files, and file db
  this.records = this.path + "/records/"

  this.entries = {};
  var files = fs.readdirSync(this.records);
  for (var i = 0; i < files.length; i++) {
    var entry = require(this.records + files[i]);
    this.entries[entry.id] = entry;
  }

}

Library.prototype.entry = function(id) {
  console.log(this.entries[id]);
}

var lib = new Library();
lib.entry("gravel_tti");
lib.entry("poisot_dsi");
