# Shelf

`shelf` is a Node.js library to manage bibliographic references in the
citeproc-json format. It is currently very bare bones.

The following (probably deprecated) code snippets are just FYI.

## How it works

From a reference path, it looks for individual files in `/records`. The files
must be `.json` (citeproc-json to be precise). It can optionally write a
`default.json` file, which is useful when using `pandoc`.

~~~ javascript
var shelf = require('shelf');
var my_library_path = "/home/foo/bar";
var lib = new shelf.Library(my_library_path);
~~~

## What it does

Write references:

~~~ javascript
lib.write()
~~~

Add references from a DOI:

~~~ javascript
var dna = "10.1038/171737a0";
var dna_ref = shelf.doi.from_doi(dna);
var newref = lib.new(dna_ref);
~~~

Get the infos for a reference given its key:

~~~ javascript
console.log(lib.entry('unique_ref_id'));
~~~
