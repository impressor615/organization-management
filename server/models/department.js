const mongoose = require('mongoose');
const { TIMESTAMPS } = require('../constants/models');

const { Schema } = mongoose;
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
}, TIMESTAMPS);

module.exports = {
  schema,
  createModel: connection => connection.model('Department', schema),
};
