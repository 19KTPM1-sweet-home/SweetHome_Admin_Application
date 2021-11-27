const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create sub schema objects
const seller = new Schema({
    name:{type: String},
    phoneNumber:{type: String},
    email:{type: String},
})
const category = new Schema({
    name:{type: String,required: true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"}
})
// create schema
const Property = new Schema(
    {
        name: {type: String, required: true},
        address: {type: String,required:true},
        description: {type: String},
        feature: [{type: String}],
        previewImage:{type:String,required: true},
        price: {type:Number,required:true},
        seller:{type:seller},
        rate: {type:Number},
        status:{type: String,required:true},
        category:{type:category},
        detailImage:[{type:String},],
        slug: {type: String, slug: 'name', unique: true},
    },
    {
        // assign createAt and updateAt fields to Schema 
        timestamps: true,
    },
);

// add soft delete framework to Schema
Property.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('Property', Property);
