const mongoose = require('mongoose');

const { Schema } = mongoose;
const AUTHORITY = {
  admin: 'admin',
  member: 'member',
};
const TIMESTAMPS = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

module.exports = (connection) => {
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
  }, TIMESTAMPS);

  const User = connection.model('User', schema);
  User.Authority = AUTHORITY;
  return User;
};
