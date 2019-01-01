const mongoose = require('mongoose');
const { TIMESTAMPS, AUTHORITY } = require('../constants/models');

const { Schema } = mongoose;
const userOrgShcema = new Schema({
  org_id: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
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
});

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organizations: [userOrgShcema],
  salt: {
    type: String,
    required: true,
  },
  name: String,
  phone: String,
  // TODO: after image upload functions is compeleted
  // TODO: lets working on later
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
