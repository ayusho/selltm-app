var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    category: [{type: Schema.Types.ObjectId, ref: 'Curation'}]
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Products', ProductSchema)