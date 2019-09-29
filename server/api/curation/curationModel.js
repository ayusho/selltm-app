var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var CurationSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    images: [
        {
            type: Buffer
        }
    ]
});

CurationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Curation', CurationSchema)