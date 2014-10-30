exports = module.exports = {
  track: function(uri){
    return "https://api.spotify.com/v1/tracks/"+uri.replace('spotify:track:', '');
  }
};
