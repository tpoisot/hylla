var fs = require('fs');
var path = require('path');
var shelf = require('../shelf.js');
var lib = new shelf.Library(path.resolve("./test/data"));

before(function() {
  // Directly add from DOI
  function add_from_doi(d) {
    var info = shelf.doi.from_doi(d);
    return lib.new(info);
  };
  // Add some informations
  var DOIs = ["10.1890/09-1328.1", "10.1017/CBO9781107415324", "10.1109/WI-IAT.2009.15"];
  DOIs.map(add_from_doi);
});

after(function() {
  fs.unlinkSync(lib.path + "/default.json"); // NOTE remove the test file
  var dir = fs.readdirSync(lib.records);
  for (var i = 0; i < dir.length; i++) {
    var to_remove = lib.records + "/" + dir[i];
    fs.unlink(to_remove, function(err) {console.log(err)});
  }

  var dir = fs.readdirSync(lib.files);
  for (var i = 0; i < dir.length; i++) {
    var to_remove = lib.files + "/" + dir[i];
    fs.unlink(to_remove, function(err) {console.log(err)});
  }
});
