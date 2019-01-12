const mongoose = require('mongoose');
const { TIMESTAMPS, TEAM_SIZES } = require('../constants/models');

const { Schema } = mongoose;
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
    default: TEAM_SIZES.tiny,
    validate: {
      validator: value => Object.keys(TEAM_SIZES).includes(value),
      message: props => `${props.value} is not a valid authority`,
    },
  },
}, TIMESTAMPS);

module.exports = {
  schema,
  createModel: connection => connection.model('Team', schema),
};
