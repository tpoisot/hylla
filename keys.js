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




function title_first_word(entry) {
  if(entry.title) {
    return 'XXXX';
  } else {
    return "notitle";
  }
}

function title_first_letters(entry) {
  if(entry.title) {
    return 'XXXX';
  } else {
    return "???";
  }
}

function Year(entry) {
  dates = ['issued', 'accessed']
  for (i in dates) {
    if (dates[i] in entry) {
      return String(entry[dates[i]]['date-parts'][0]);
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
module.exports.Year = Year;
module.exports.Yr = Yr;

// Key functions
module.exports.author_Year = author_Year;
module.exports.authorYear = authorYear;
module.exports.author_Yr = author_Yr;
module.exports.authorYr = authorYr;
