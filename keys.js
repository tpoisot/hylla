var diacritics = require('diacritics');

function cleanWord(word) {
  // Remove the punctuation
  word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  // Remove the diacritics
  word = diacritics.remove(word);
  return word;
}

function formatName(name) {
  if (name.literal) {
    fname = name.literal;
  } else {
    fname = name.family;
  }
  return cleanWord(fname).replace(/\s/g, '');
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

function author(entry) {
  return Author(entry).toLowerCase();
}

function AUTHOR(entry) {
  return Author(entry).toUpperCase();
}

function Aut(entry) {return Author(entry).substr(0, 3);}
function aut(entry) {return author(entry).substr(0, 3);}
function AUT(entry) {return AUTHOR(entry).substr(0, 3);}



function title_first_word(entry) {
  if(entry.title) {
    var title = cleanWord(entry.title);
    return title.split(" ")[0].toLowerCase();
  } else {
    return "notitle";
  }
}

function title_first_letters(entry) {
  if(entry.title) {
    var title = cleanWord(entry.title);
    return title.split(" ").map(function(x){return x[0]}).join('').toLowerCase().substr(0, 3);
  } else {
    return "???";
  }
}

function Year(entry) {
  dates = ['deposited', 'indexed', 'issued', 'accessed'];
  for (i in dates) {
    var date_field = dates[i];
    if(date_field in entry) {
      if ('timestamp' in entry[date_field]) {
        var date = new Date(entry[date_field]['timestamp']);
        return String(date.getFullYear());
      } else {
        var parts = entry[date_field]['date-parts'];
        return String(parts[0][0]);
      }
    }
  }
  return '????';
}

function Yr(entry) {
  var year = Year(entry);
  year = year.substr(-2);
  return year;
}



function authorYear(entry) {
  return author(entry) + Year(entry);
}

function author_Year(entry) {
  return author(entry) + "_" + Year(entry);
}

function authorYr(entry) {
  return author(entry) + Yr(entry);
}

function author_Yr(entry) {
  return author(entry) + "_" + Yr(entry);
}

// Piece-wise functions
module.exports.Author = Author;
module.exports.author = author;
module.exports.AUTHOR = AUTHOR;
module.exports.Aut = Aut;
module.exports.aut = aut;
module.exports.AUT = AUT;


module.exports.Year = Year;
module.exports.Yr = Yr;

module.exports.title_first_word = title_first_word;
module.exports.title_first_letters = title_first_letters;

// Key functions
module.exports.author_Year = author_Year;
module.exports.authorYear = authorYear;
module.exports.author_Yr = author_Yr;
module.exports.authorYr = authorYr;
