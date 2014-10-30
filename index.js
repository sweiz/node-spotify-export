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
  , file = process.argv[2]
  , format = process.argv[3] || 'xspf'
  , albumImages = []
  , tracks = []
  , config = require('./config')
  , tmpl = fs.existsSync(path.normalize(__dirname+'/templates/'+format+'.hbs')) ? Handlebars.compile(fs.readFileSync(path.normalize(__dirname+'/templates/'+format+'.hbs'), 'utf8')) : false
;
if(!tmpl || !fs.existsSync(path.normalize(__dirname+'/'+file))) {
  console.log('Error: Missing Templates and/or cannot file file');
  console.log('TemplateDir: '+path.normalize(__dirname+'/templates/'+format+'.hbs'));
  console.log('FileDir: '+path.normalize(__dirname+'/'+file));
}
else {
  fs.readFile(path.normalize(__dirname+'/'+file), 'utf8', function(err,fileContents){
    if(err) throw err;
    console.log('Tracklist loaded. Starting conversion...');
    var tracksList = fileContents.split(' ')
      , progress = new progressBar(':bar', {width: 50,total: tracksList.length+1});
    async.eachSeries(tracksList, function(URI, cb){
      request(config.track(URI), function(err, status, body){
        if(err) cb(err);
        var track = JSON.parse(body);
        tracks.push(track);
        progress.tick();
        cb(null);
      });
    }, function(err){
      if(err) throw err;
      fs.writeFile(path.normalize(__dirname+'/'+file+'.'+format), tmpl({tracks:tracks}), function(err){
        if(err) throw err;
        console.log('\nDone: '+path.normalize(__dirname+'/'+file+'.'+format));
      });
    });
  });
}
