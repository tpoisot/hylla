var fs = require('fs');
var keys = require('./keys.js');


function Entry(entry, lib) {
  this.content = entry;
  this.library = lib;
}

Entry.prototype.id = function() {
  if(this.content.id) {
    return this.content.id;
  } else {
    this.content.id = keys.generate(this.content, this.library.entries);
    this.id();
  }
}

Entry.prototype.json = function() {
  return JSON.stringify(this.content, null, 2);
}

Entry.prototype.write = function() {
  // TODO: implement
}

Entry.prototype.read = function() {
  // TODO: implement
}

module.exports.Entry = Entry;
