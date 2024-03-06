const { Schema } = require('mongoose');
const OrderSchema = new Schema(
  {
    id: {
      type: String,
      required: false,
    },
    items: {
      type: Schema.Types.Array,
      items: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      // type: [Schema.Type.ObjectId],
      // ref: "Product",
    },
    itemTotal: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    receiverPhone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'paid',
    },
  },
  {
    timestamps: { currentTime: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 9) },
  }
);

module.exports = OrderSchema;
