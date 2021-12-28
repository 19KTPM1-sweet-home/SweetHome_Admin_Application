const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add slug generator plugin to mongoose
const mongooseDelete = require('mongoose-delete');
// const seller = new Schema({
//   name: { type: String },
//   phoneNumber: { type: String },
//   email: { type: String },
// });
// create schema
const Schedule = new Schema(
  {
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    phoneNumber: {type: String, unique: true, required: true},
    message: {type: String},
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    ack: { type: String, required: true},
    appointmentDate: { type: Date, required: true }
  },
  {
    // assign createAt and updateAt fields to Schema
    timestamps: true,
  },
);

// add soft delete framework to Schema
Schedule.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
// add plugin

// create models and export it
module.exports = mongoose.model('Schedule', Schedule);
