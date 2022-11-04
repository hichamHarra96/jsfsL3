module.exports.home = (req, res) => res.render('index', {title : 'Page d\'accueil'});

module.exports.about = (req, res) => res.render('about', {title : 'About page'});

module.exports.adminonly = (req, res) => res.render('adminonly');