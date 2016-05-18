var diacritics = require('diacritics');

/**
 Return a cleaned version of a string

 Specifically, this function will remove all punctuation signs and numbers. It
 will then remove all the diacritics, so that the end result is a string with
 only `a-ZA-Z` and whitespaces.

 @param {String} word The string to be cleaned
 */
function cleanWord(word) {
  // Remove the punctuation
  word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/[0-9]/g, "");
  // Remove the diacritics
  word = diacritics.remove(word);
  return word;
}

/**
 Return a cleaned version of a name

 Specifically, this function will return the family name for persons, and the
 literal names in all other cases. The names will be cleaned using {@link cleanWord}.

 @param {Object} name The name object
 */
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

function title_first_letters(entry) {
  if(entry.title) {
    var title = cleanWord(entry.title);
    return title.split(" ").map(function(x){return x[0]}).join('').toLowerCase().substr(0, 3);
  } else {
    return "???";
  }
}

function Year(entry) {
  dates = ['issued', 'deposited', 'indexed', 'accessed'];
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

function generate(entry, current_names) {
  var root_aut = Author(entry).toLowerCase().substr(0,4);
  var root_dat = Yr(entry);
  var root_let = title_first_letters(entry);
  var root_key = root_aut + root_dat + root_let;
  var trial_key = root_key;
  var trials = 1;
  while(trial_key in current_names) {
    trials += 1;
    trial_key = root_key + String(trials);
  }
  return trial_key;
}

// Piece-wise functions
module.exports.Author = Author;

module.exports.Year = Year;
module.exports.Yr = Yr;

module.exports.title_first_letters = title_first_letters;

// Key functions
module.exports.generate = generate;
