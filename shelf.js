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

  /* NOTE this might have to be changed later on
  *  it currently assumes aut_yr_lett , which would be a relatively short scheme
  */
  this.keymaker = function(entry) {
    return [keys.aut(entry), keys.Yr(entry), keys.title_first_letters(entry)].join("");
  }
  // TODO allow to substitute a default

  // Build the path for records, files, and file db
  this.records = this.path + "/records/"
  // TODO files
  // TODO check that all of these paths are directories

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
  });
};

Library.prototype.new = function(entry) {
  if (entry) {
    var root_key = this.keymaker(entry);
    var tentative_key = root_key;
    var attempts = 1;
    while(tentative_key in this.entries) {
      attempts += 1;
      tentative_key = root_key + String(attempts);
    }
    entry.id = tentative_key;
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
module.exports.doi = doi;
