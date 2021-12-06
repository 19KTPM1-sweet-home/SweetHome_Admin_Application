const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// create schema
const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String },
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
    email: { type: String, unique: true, required: true },
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    slug: { type: String, slug: 'name', unique: true, required: true },
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
// add plugin
mongoose.plugin(slug);

// create models and export it
module.exports = mongoose.model('User', User);
