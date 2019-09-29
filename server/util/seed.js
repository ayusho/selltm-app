var Curation = require('../api/curation/curationModel');
var Product = require('../api/products/productsModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding Database');

var curations = [
    {  type: 'Watches', description: 'Amazing quility sports Watch'},
];

var products = [
    { title: 'Titan Watch', price: 234 },
    { title: 'Smart Watch1', price: 1233 }
];

var createDoc = function(model, doc){
    return new Promise(function(resolve, reject){
        new model(doc).save(function(err, saved){
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = function (){
    logger.log('...cleaning the DB');
    var cleanPromises = [Curation, Product]
        .map(function(model){
            return model.deleteOne().exec();
        });
    return Promise.all(cleanPromises);
};

var createCuration = function(data){
    var promises = curations.map(function(curations){
        return createDoc(Curation, curations)
    });

    return Promise.all(promises)
        .then(function(curations){
            return _.merge({curations: curations}, data || {});
        })
};

var createProduct = function(data){
    var promises = products.map(function(product){
        return createDoc(Product, product)
    });

    return Promise.all(promises)
        .then(function(products){
            return _.merge({products: products}, data || {});
        })
};

cleanDB()
    .then(createCuration)
    .then(createProduct)
    .then(logger.log('...Data Seeded!!!'));