var diacritics = require('diacritics');

function formatName(name) {
  if (name.literal) {
    fname = name.literal;
  } else {
    fname = name.family;
  }
  return diacritics.remove(fname).replace(/\s/g, '');
}

function Author(entry) {
  if (entry.author) {
    var A = entry.author[0];
    return formatName(A);
  } else if (entry.editor) {
    var A = entry.editor[0];
    return formatName(A);
  } else {
    return "Anonymous";
  }
}

module.exports.Author = Author;
