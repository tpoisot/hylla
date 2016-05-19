var fs = require('fs');
var os = require('os');
var path = require('path');

var entries = require('./entries.js');
var keys = require('./keys.js');
var doi = require('./doi.js');
var pdf = require('./icanhazpdf.js');

function Library(library) {

  // Default path if none given
  if (library === undefined) {
    var home = process.env.HOME || process.env.USERPROFILE;
    library = home + "/.pandoc";
  }
  this.path = path.resolve(library);

  // Build the path for records, files, and file db
  this.records = this.path + "/records/"
  // TODO files
  // TODO check that all of these paths are directories
  // TODO create paths if not exist

  // Read entries
  this.entries = [];
  this.read();

}

Library.prototype.read = function(id) {
  var files = fs.readdirSync(this.records);
  this.entries = [];
  for (var i = 0; i < files.length; i++) {
    // This is the file we read FROM
    var load_from = this.records + files[i];
    var entry = require(load_from);
    // We convert this into an object
    var entry_object = new entries.Entry(entry, this);
    // If there is no id present, we generate one
    if(entry_object.content.id === undefined) {
      entry_object.content.id = this.generate(entry_object.content);
    }
    // Knowing the id, this is the filename the reference should have
    var load_expect = this.records + entry_object.id() + ".json";
    // If there is a mismatch, we fix it
    if(load_expect != load_from) {
      // by removing the old file
      fs.unlinkSync(load_from);
      // and writing the correct one
      fs.writeFile(load_expect, entry_object.json(), 'utf-8', function(e) { console.log(e);});
    }
    // Then we add the entry to the library
    this.entries.push(entry_object);
  }
}

Library.prototype.keys = function() {
  return this.entries.map(function(element, index, array) {return element.id()});
}

Library.prototype.entry = function(id) {
  var ok = this.entries.filter(function(element, index, array) {return element.id() == id});
  if(ok.length == 1) {
    return ok[0]
  } else {
    return undefined;
  }
}

Library.prototype.generate = function(entry) {
  var root_aut = keys.Author(entry).toLowerCase().substr(0,4);
  var root_dat = keys.Yr(entry);
  var root_let = keys.title_first_letters(entry);
  var root_key = root_aut + root_dat + root_let;
  var trial_key = root_key;
  var trials = 1;
  while(this.entry(trial_key)) {
    trials = trials + 1;
    trial_key = root_key + String(trials);
  }
  return trial_key;
}

Library.prototype.write = function() {
  fs.writeFile(this.path + "/default.json", JSON.stringify(this.entries.map(function(e) {return e.content}), null, 2), 'utf-8', function(err) {
    console.log(err);
  });
};

Library.prototype.new = function(infos) {
  var entry = new entries.Entry(infos);
  entry.content.id = this.generate(entry.content);
  // The reference is written to file
  fs.writeFileSync(this.records + "/" + entry.id() + ".json", entry.json(), 'utf-8', function(err) {
      console.log(err);
    });
  // The library is reloaded immediately after
  this.read(); // IDEA: maybe push instead of reloading?
  // NOTE the id of the new reference is returned because it might be useful
  return entry.id();
}

module.exports.Library = Library;
module.exports.keys = keys;
module.exports.doi = doi;
module.exports.pdf = pdf;
