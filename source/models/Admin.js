const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const Admin = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    phoneNumber:{type:String},
    job:{ type: String},
    age:{type:Number},
    email:{type:String},
    address:{type:String},
    avatar:{type:String},
    background:{type:String},
    lock:{type: String, required: true},
    slug: { type: String, slug: 'username', unique: true },
  },
  {
    // assign createAt and updateAt fields to Schema
    timestamps: true,
  },
);

// add soft delete framework to Schema
Admin.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('Admin', Admin);
