var Product = require('./productsModel');
var Curation = require('../curation/curationModel');

var logger = require('../../util/logger');
var _ = require('lodash');

exports.params = function(req, res, next, id){
    Product.findById(id)
        .then(function(product){
            if(!product){
                next(new Error('No product found with that id'))
            }
            else {
                req.product = product;
                next();
            }
        }, function(err){
            next(err);
        });
};


exports.get = function(req, res, next){

    Product.find({})
    .then(function(product){
        res.json(product);
    },function(err){
        next(err);
    });
}

exports.post = function (req, res, next){
    var newProduct = {category: []};
    newProduct.title = req.body.title;
    newProduct.price = req.body.price;
    newProduct.image = req.files.image.data;
    newProduct.category.push(req.body.category);
    
    Product.create(newProduct)
        .then(function(product){
            if(product._id){
                Curation.update({
                    _id: req.body.category
                }, {
                    '$push': {
                        products: product._id,
                        images: product.image
                    }
                }, function(err, updated){
                    if(err){
                        next(err);
                    }
                    else{
                        res.json("Updated the product ", updated, product)
                    }
                })
            }
        }, function(err){
            logger.log(err);
            next(err);
        })
        .catch(function(err){
            logger.log(err);
        });
}

exports.put = function (req, res, next){
    var product = req.product;

    var update = req.body;
    update.image = req.files.image.data;
    product.category.push(mongoose.Types.ObjectId(update.category));
    delete update.category;
    _.merge(product, update);
    product.save(function(err, saved){
        if(err){
            next(err);
        }
        else{
            res.json(saved);
        }
    })
}

exports.delete = function(req, res, next){
    req.product.remove(function(err, removed){
        if(err){
            next(err);
        }
        else {
            res.json(removed);
        }
    });
}