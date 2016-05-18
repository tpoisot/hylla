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
    this.content.id = keys.generate(this.content, this.lib);
    this.write();
  }
}

Entry.prototype.write = function() {
  // TODO: implement
}

Entry.prototype.read = function() {
  // TODO: implement
}
