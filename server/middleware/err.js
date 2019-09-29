module.exports = function () {
    return function (err, req, res, next) {
        console.log(err.message);
        res.send(500);
    }
}
