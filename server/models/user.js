const mongoose = require('mongoose');
const { TIMESTAMPS, AUTHORITY } = require('../constants/models');

const { Schema } = mongoose;
const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  department_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company.departments',
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  authority: {
    type: String,
    required: true,
    default: AUTHORITY.member,
    validate: {
      validator: value => Object.keys(AUTHORITY).includes(value),
      message: props => `${props.value} is not a valid authority`,
    },
  },
  name: String,
  phone: String,
  profile: String,
  // TODO: need to divide into separate model
  position: String,
}, TIMESTAMPS);

module.exports = {
  schema,
  createModel: (connection) => {
    const User = connection.model('User', schema);
    User.Authority = AUTHORITY;
  },
};
