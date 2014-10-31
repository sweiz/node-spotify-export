#! /usr/bin/node
/* jshint
      laxcomma  :   true
    , laxbreak  :   true
    , sub       :   false
    , unused    :   false
*/

var path = require('path')
  , fs = require('fs')
  , async = require('async')
  , request = require('request')
  , Handlebars = require('handlebars')
  , progressBar = require('progress')
  , cwd = process.cwd()
  , file = process.argv[2]
  , format = process.argv[3] || 'xspf'
  , paths = {
      file: path.normalize(cwd+'/'+file)
    , output: path.normalize(cwd+'/'+file+'.'+format)
  }
  , albumImages = []
  , config = require('./config')
  , tmpl = fs.existsSync(path.normalize(__dirname+'/templates/'+format+'.hbs')) ? Handlebars.compile(fs.readFileSync(path.normalize(__dirname+'/templates/'+format+'.hbs'), 'utf8')) : false
  , convert = function(file, cb){
    var thisFile = path.normalize(path.join(cwd, file));
    fs.readFile(thisFile, 'utf8', function(err,fileContents){
      if(err) throw err;
      console.log('\n Converting: '+file);
      var trackURIs = fileContents.split(' ')
        , progress = new progressBar(':bar', {width: 50,total: trackURIs.length+1});
      async.map(trackURIs, function(URI, cb){
        request(config.track(URI), function(err, status, body){
          if(err) return cb(err);
          var track;
          try{
            track = JSON.parse(body);
          } catch(err){
            return cb(err);
          }
          cb(null, track);
        });
      }, function(err, tracks){
          if(err) throw err;
          fs.writeFile(thisFile+'.'+format, tmpl({tracks:tracks}), function(err){
            if(err) {
              if(cb) return cb(err);
              else throw err;
            }
            if(cb) return cb(null);
            console.log('\nDone: '+paths.output);
          });
      });
    });
  }
;
if(!tmpl) { return console.log('Error: Missing Templates\nTemplateDir: '+path.normalize(__dirname+'/templates/'+format+'.hbs'));}
if(file === 'all' || file === 'ALL' || file === "All"){
  fs.readdir(cwd, function(err, files){
    async.each(files, function(thisFile, cb){
      convert(thisFile, cb);
    }, function(err){
      console.log('\nDone!');
    });
  });
} else {
  convert(file);
}
