var diacritics = require('diacritics');

function Author(entry) {
  if (entry) {
    console.log("author");
    console.log(entry.author);
  }
}

module.exports.Author = Author;
