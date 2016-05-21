var request = require('sync-request');
var fs = require('fs');

match_doi_to_publisher = function(doi) {
  // TODO: Read from an object?
  // Elsevier
  if(/10\.1111/.test(doi)) {return 'wiley'}
  // Elsevier
  if(/10\.1016/.test(doi)) {return 'elsevier'}
  // Royal Society
  if(/10\.1098/.test(doi)) {return 'royal_society'}
  // PNAS
  if(/pnas/.test(doi)) {return 'pnas'}
  // PeerJ
  if(/peerj/.test(doi)) {return 'peerj'}
  // Plos
  if(/10\.1371\/journal\.p(pat|one|med|gen|ntd|bio|cbi)\./.test(doi)) {return 'plos'}
  // If not, return undefined
  return undefined;
}

pdf_plos = function(doi) {
  var PLOS = {
    "cbi": "compbiol",
    "med": "medicine",
    "pat": "pathogens",
    "one": "one",
    "ntd": "ntds",
    "bio": "biology"
  }
  var match = /10\.1371\/journal\.p(pat|one|med|gen|ntd|bio|cbi)\./.exec(doi);
  var journal = match[1];
  var url = "http://www.plos" + PLOS[journal] + ".org/article/fetchObject.action?uri=info:doi/" + doi + "&representation=PDF";
  return url;
}

get_pdf = function(doi) {
  if(doi == undefined) return undefined;
  var publisher = match_doi_to_publisher(doi);

  // If we get a publisher...
  if(publisher == undefined) return undefined;
  if(publisher == "plos") var url = pdf_plos(doi);

  var fname = doi.replace(/\./g, "fizz").replace(/\//g, "buzz") + ".pdf";

  // Now we download the pdf
  var pdf_content = request('GET', url, {
    'headers': {
      // Nothing to see here, I'm a Mac-using real person, not some sort of code
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'
    }
  });

  var content = pdf_content.getBody();
  fs.writeFileSync(fname, content, 'utf-8', function(e){if(e)console.log(e);})
  return fname;

  // It failed? This should happen sometimes
  return undefined;
}

module.exports.match = match_doi_to_publisher;
module.exports.get = get_pdf;
