/*jslint node: true */
"use strict";

var targz = require('tar.gz');

var fetch = {
  capture: function(path, filename, req, res) {
    targz().compress(path, filename)
      .then(function(){
        console.log('Job done! Filename: ', filename);
        res.set({
          "Content-Disposition": 'attachment; filename="'+filename+'"'
        });
        res.sendfile('tmp/'+filename);
      })
      .catch(function(err){
        console.log('Something is wrong ', err.stack);
        res.send('Oops!');
      });
  }
};

module.exports = fetch;