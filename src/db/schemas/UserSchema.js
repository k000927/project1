const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      type: String,
    },
    wishList: {
      type: Array,
      default: [],
    },
    point: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
      enum: ['bronze', 'silver', 'gold'],
      default: 'bronze'
    },
    isActivated: {
      type: Boolean,
      default: true,
    },
    totalPurchase: {
      type: Number,
      default: 0,
    }
  },
  {
    collection: 'users',
    timestamps: { currentTime: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 9) }
  }
);

module.exports = UserSchema;
