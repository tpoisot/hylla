var request = require('sync-request');
var fs = require('fs');

match_doi_to_publisher = function(doi) {
  // TODO: Read from an object?
  // Elsevier
  if(/10\.1111/.test(doi)) {return 'wiley'};
  // Elsevier
  if(/10\.1016/.test(doi)) {return 'elsevier'};
  // Royal Society
  if(/10\.1098/.test(doi)) {return 'royal_society'};
  // PNAS
  if(/pnas/.test(doi)) {return 'pnas'};
  // PeerJ
  if(/peerj/.test(doi)) {return 'peerj'};
  // Plos
  if(/10\.1371\/journal\.p(pat|one|med|gen|ntd|bio|cbi)\./.test(doi)) {return 'plos'};
  // If not, return undefined
  return undefined;
}

get_pdf = function(doi) {
  return undefined;
}

module.exports.match = match_doi_to_publisher;
module.exports.get = get_pdf;

// header = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0',}
