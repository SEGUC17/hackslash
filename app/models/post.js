var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

var postSchema = new mongoose.Schema({
    ownerEmail: {
        type: String,
        required: true
    },
    /*type of the post itself (1- sell, 2- shelter, 3- mate, 4- lost, 5- found, 6- exchange)*/
    type: {
        type: Number,
        min: 1,
        max: 6,
        required: true
    },
    // kind of the animal ; cat , dog ...
    kind: {
        type: String
    },
    // species that the animal belong to ; eg. sherazi cat
    species: {
        type: String
    },
    price: {
        type: SchemaTypes.Double
    },
    description: {
        type: String
    },
    images: [String],
    note: String,
    date: {
        type: Date,
        default :Date.now
    },
    upVote: {
        type: Number,
        default :0
    },
    downVote: {
        type: Number,
        default :0
    }
});

var Post = mongoose.model("post", postSchema);

module.exports = Post;