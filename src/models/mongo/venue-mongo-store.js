import { Venue } from "./venue.js";

export const venueMongoStore = {
  async getVenuesByCityId(id) {
    const venues = await Venue.find({ cityid: id }).lean();
    return venues;
  },
};
