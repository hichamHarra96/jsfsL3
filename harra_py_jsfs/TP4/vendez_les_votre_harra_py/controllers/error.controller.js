const createError = require('http-errors');
const url = require('url');

const notFound = (req, res, next) => {
    next(createError(404));
}

const handleError = (err, req, res, next) => {
    res.local.message = err.message;
    res.local.error = res.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', {error : err, url : req.url});
};

module.exports.notFound = notFound;
module.exports.handleError = handleError;