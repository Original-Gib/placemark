import Mongoose from "mongoose";

const { Schema } = Mongoose;

const venueSchema = new Schema({
  venueName: String,
  street: String,
  genre: String,
  cityid: {
    type: Schema.Types.ObjectId,
    ref: "City",
  },
});

export const Venue = Mongoose.model("Venue", venueSchema);
