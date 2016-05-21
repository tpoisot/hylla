var diacritics = require('diacritics');
var keyword = require("keyword-extractor");

/**
 Return a cleaned version of a string

 Specifically, this function will remove all punctuation signs and numbers. It
 will then remove all the diacritics, so that the end result is a string with
 only `a-ZA-Z` and whitespaces.

 @param {String} word The string to be cleaned
 */
function cleanWord(word) {
  // Remove the punctuation
  word = word.replace(/[“”’‘.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/[0-9]/g,
    "");
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
  var fname = name.family ? name.family : name.literal;
  return cleanWord(fname).replace(/\s/g, '');
}

/** Extract the name of the first author
@param {Object} entry The object representation of a citeproc reference
@return {String} A string with either the family or institution name, or "Anonymous"
*/
function nameOfFirstAuthor(entry) {
  var name = "Anonymous";
  if (entry.author) {
    name = formatName(entry.author[0]);
  } else if (entry.editor) {
    name = formatName(entry.editor[0]);
  }
  return name;
}

function firstLettersOfTitle(entry) {
  if (entry.title) {
    var title = cleanWord(entry.title);
    // Extract keywords
    var keywords = keyword.extract(title, {
      language: "english",
      remove_duplicates: "false"
    });
    return keywords.map(function(x) {
      return x[0]
    }).join('').toLowerCase().substr(0, 3);
  } else {
    return "???";
  }
}

function entireYear(entry) {
  var dates = ['issued', 'created', 'deposited', 'indexed', 'accessed'];
  for (i in dates) {
    var dateFieldType = dates[i];
    if (dateFieldType in entry) {
      if (entry[dateFieldType].timestamp) {
        var date = new Date(entry[dateFieldType].timestamp);
        return String(date.getFullYear());
      } else {
        var parts = entry[dateFieldType]['date-parts'];
        if (parts) {
          if (parts[0] !== null) {
            return String(parts[0][0]);
          }
        }
      }
    }
  }
  return '????';
}

function lastDigitsOfYear(entry) {
  var year = entireYear(entry);
  year = year.substr(-2);
  return year;
}

// Piece-wise functions
module.exports.nameOfFirstAuthor = nameOfFirstAuthor;

module.exports.entireYear = entireYear;
module.exports.lastDigitsOfYear = lastDigitsOfYear;

module.exports.firstLettersOfTitle = firstLettersOfTitle;
