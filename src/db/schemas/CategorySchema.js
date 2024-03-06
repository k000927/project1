const { Schema } = require('mongoose');

const CategorySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = CategorySchema;
