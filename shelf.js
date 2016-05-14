var diacritics = require('diacritics');
var fs = require('fs');
var os = require('os');
var path = require('path');

function Library(library) {

  // Default path if none given
  if (library === undefined) {
    var home = process.env.HOME || process.env.USERPROFILE;
    library = home + "/.pandoc";
  }
  this.path = path.resolve(library);

  // Build the path for records, files, and file db
  this.records = this.path + "/records/"

  // Read entries
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

Library.prototype.write = function () {
  fs.writeFile(this.path + "/default.json", JSON.stringify(this.entries, null, 2), 'utf-8', function(err) { console.log(err);})
};

module.exports.Library = Library;
