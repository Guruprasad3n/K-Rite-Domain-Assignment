const { Schema, model } = require("mongoose");

const domainSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: null,
  }
);
const domainModel = model("Domain", domainSchema);
module.exports = domainModel;
