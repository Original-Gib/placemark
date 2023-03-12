import Mongoose from "mongoose";

const { Schema } = Mongoose;

const citySchema = new Schema({
  cityName: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const City = Mongoose.model("City", citySchema);
