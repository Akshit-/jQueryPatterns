/*
 * GET soundcloud
 */

exports.index = function(req, res){
  res.render('soundcloud', { title: 'Soundcloud' });
};

exports.auth = function(req, res) {
  res.render('soundcloud-auth', { title: 'Soundcloud' });
}
