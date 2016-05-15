var fs = require('fs');
var os = require('os');
var path = require('path');

var keys = require('./keys.js');
var doi = require('./doi.js');

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
  this.read();

}

Library.prototype.read = function(id) {
  var files = fs.readdirSync(this.records);
  for (var i = 0; i < files.length; i++) {
    var entry = require(this.records + files[i]);
    this.entries[entry.id] = entry;
  }
}

Library.prototype.entry = function(id) {
  if (id in this.entries) {
    return this.entries[id];
  } else {
    return undefined;
  }
}

Library.prototype.write = function() {
  fs.writeFile(this.path + "/default.json", JSON.stringify(this.entries, null, 2), 'utf-8', function(err) {
    console.log(err);
  })
};

Library.prototype.new = function(entry) {
  if(entry) {
    entry.id = keys.generate(entry);
    // The reference is written to file
    fs.writeFileSync(this.records + "/" + entry.id + ".json", JSON.stringify(entry, null, 2), 'utf-8', function(err) {
      console.log(err);
    });
    // The library is reloaded immediately after
    this.read();
    // NOTE the id of the new reference is returned because it might be useful
    return entry.id;
  }
}

module.exports.Library = Library;
module.exports.keys = keys;
