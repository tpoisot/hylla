# Shelf

`hylla` is a Node.js library to manage bibliographic references in the
citeproc-json format. It is currently very bare bones.

[![Code climate](https://img.shields.io/codeclimate/github/tpoisot/hylla.svg)](https://codeclimate.com/github/tpoisot/hylla)
[![Travis](https://img.shields.io/travis/tpoisot/hylla.svg)](https://travis-ci.org/tpoisot/hylla)
[![Coveralls](https://img.shields.io/coveralls/tpoisot/hylla.svg)](https://coveralls.io/github/tpoisot/hylla)
![Dependencies](https://img.shields.io/david/tpoisot/hylla.svg)
![Dependencies](https://img.shields.io/david/dev/tpoisot/hylla.svg)
![License](https://img.shields.io/github/license/tpoisot/hylla.svg)

The following (probably deprecated) code snippets are just FYI.

## How it works

From a reference path, it looks for individual files in `/records`. The files
must be `.json` (citeproc-json to be precise). It can optionally write a
`default.json` file, which is useful when using `pandoc`.

~~~ javascript
var hylla = require('hylla');
var my_library_path = "/home/foo/bar";
var lib = new hylla.Library(my_library_path);
~~~

## What it does

Write references:

~~~ javascript
lib.write()
~~~

Add references from a DOI:

~~~ javascript
var dna = "10.1038/171737a0";
var dna_ref = hylla.doi.refFromDoi(dna);
var newref = lib.new(dna_ref);
~~~

Get the infos for a reference given its key:

~~~ javascript
console.log(lib.entry('unique_ref_id'));
~~~

Though of course you should do absolutely none of these things this way, and
write wrappers instead.
