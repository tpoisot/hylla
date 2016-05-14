var request = require('request');
var fs = require('fs');
var crypto = require('crypto');

function get_json_from_doi(doi) {
  hash = crypto.createHash('md5').update(doi).digest("hex");
  url = "http://api.crossref.org/works/" + doi + "/transform/application/vnd.citationstyles.csl+json"
  request(url, function(error, response, body) {
    fs.writeFileSync(hash + '.json', JSON.stringify(JSON.parse(body), null, 2));
  });
}

/* NOTE
This might not be the right way. Maybe all of that can be done internally by one of the library function. I don't really know.
*/

function from_doi(doi) {
  // Download the file, return an object, delete
  get_json_from_doi(doi);
  hash = crypto.createHash('md5').update(doi).digest("hex");
  var entry = JSON.parse(fs.readFileSync(hash + '.json'), 'utf8');
  console.log(entry);
  return entry;
  // fs.unlinkSync(fname);
}

module.exports.from_doi = from_doi;
