var Curation = require('./curationModel');
var Products = require('../products/productsModel');

var logger = require('../../util/logger');
var _ = require('lodash');
var mongoose = require('mongoose');

exports.params = function(req, res, next, id){
    Curation.findById(id)
        .then(function(curation){
            if(!curation){
                next(new Error('No curation found with that id'))
            }
            else {
                req.curation = curation;
                next();
            }
        }, function(err){
            next(err);
        });
};

exports.get = function(req, res, next){
    let pageNo = parseInt(req.query.pageNo);
    let size = parseInt(req.query.size);

    Curation.paginate({}, { page: pageNo, limit: size })
    .then(function(curation){
        res.json(curation);
    },function(err){
        next(err);
    });
}

exports.post = function (req, res, next){
    var newCuration = {products: []};
    newCuration.type = req.body.type;
    newCuration.description = req.body.description;
    // newCuration.products.push(req.body.products);
    
    Curation.create(newCuration)
        .then(function(curation){
            res.json(curation);
        }, function(err){
            logger.log(err);
            next(err);
        })
        .catch(function(err){
            logger.log(err);
        });
}

exports.put = function (req, res, next){
    var curation = req.curation;

    var update = req.body;
    if(update.product){
        curation.products.push(update.product);
    }
    delete update.product;
    _.merge(curation, update);
    curation.save(function(err, saved){
        if(err){
            next(err);
        }
        else{
            res.json(saved);
        }
    })
}

exports.delete = function(req, res, next){
    req.curation.remove(function(err, removed){
        if(err){
            next(err);
        }
        else {
            res.json(removed);
        }
    });
}