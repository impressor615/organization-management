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
      validator(value) {
        return this.departments.every(
          department => department.name !== value.name,
        );
      },
      message: props => `${props.value} is not a valid department`,
    },
  },
}, TIMESTAMPS);

module.exports = {
  schema,
  createModel: connection => connection.model('Company', schema),
};
