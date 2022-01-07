const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

// add plugin
mongoose.plugin(slug);

// create schema
const User = new Schema(
  {
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String },
    avatar: { type: String },
    favourite: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
    email: { type: String, unique: true, required: true },
    phoneNumber: {type: String, unique: true},
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    lock: {type: String, required: true},
    slug: { type: String, slug: 'fullName', unique: true},
  },
  {
    // assign createAt and updateAt fields to Schema
    timestamps: true,
  },
);

// add soft delete framework to Schema
User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});


// create models and export it
module.exports = mongoose.model('User', User);
