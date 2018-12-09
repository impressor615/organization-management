const _ = require('lodash');
const mongoose = require('mongoose');
const {
  schema: departmentSchema,
} = require('./department');
const { TIMESTAMPS } = require('../constants/models');

const { Schema } = mongoose;
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departments: {
    type: [departmentSchema],
    validate: {
      validator(v) {
        const test = Object.entries(_.groupBy(v, 'name'));
        console.log(test);
        return Object.entries(_.groupBy(v, 'name')).every(item => (item[1].length === 1));
      },
      message: props => `${props.value} is not a valid department`,
    },
  },
}, TIMESTAMPS);

module.exports = {
  schema,
  createModel: connection => connection.model('Company', schema),
};
