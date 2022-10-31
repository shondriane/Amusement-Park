const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    userName: { type: String, required: true },
    reviewId: { type: Schema.Types.ObjectId, ref: "Review" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
