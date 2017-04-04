var mongoose = require('mongoose');
Schema = mongoose.Schema,
require('mongoose-double')(mongoose);
autoIncrement = require('mongoose-auto-increment');

var SchemaTypes = mongoose.Schema.Types;

var connection = mongoose.createConnection("mongodb://localhost:27017/pets");
autoIncrement.initialize(connection);

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
        type: String,
        required: true
    },
    // species that the animal belong to ; eg. sherazi cat
    species: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male','female','null']
    },
    kind_B: {
        type: String
    },
    species_B: {
        type: String
    },
    gender_B: {
        type: String,
        enum: ['male','female','null']
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
    },
    raters :[String]
});

postSchema.plugin(autoIncrement.plugin, 'Post');
var Post = connection.model('Post', postSchema);

module.exports = Post;
