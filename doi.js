var request = require('sync-request');
var fs = require('fs');

function from_doi(doi) {
  var url = "http://api.crossref.org/works/" + doi + "/transform/application/vnd.citationstyles.csl+json";
  var res = request('GET', url);
  if(res.statusCode == 200) {
    return JSON.parse(res.getBody('utf-8'));
  } else {
    return undefined;
  }
}

module.exports.from_doi = from_doi;
