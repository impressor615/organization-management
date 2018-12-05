const mongoose = require('mongoose');

const { Schema } = mongoose;
const TIMESTAMPS = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

module.exports = (connection) => {
  const schema = new Schema({
    name: {
      type: String,
      required: true,
    },
  }, TIMESTAMPS);

  return connection.model('Company', schema);
};
