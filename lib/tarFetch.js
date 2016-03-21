/*jslint node: true */
"use strict";

var targz = require('tar.gz');
var path = require('path');

var fetch = {
  capture: function(pathToCompress, filename, req, res) {
    
    var pathToOutput = path.join(__dirname, '../tmp/', filename);
    console.log('output dir: ', pathToOutput);
    targz().compress(pathToCompress, pathToOutput)
      .then(function(){
        console.log('Job done! Output: ', pathToOutput);
        res.set({
          "Content-Disposition": 'attachment; filename="'+filename+'"'
        });
        res.sendFile(pathToOutput);
      })
      .catch(function(err){
        console.log('Something is wrong ', err.stack);
        res.send('Oops!');
      });
  }
};

module.exports = fetch;