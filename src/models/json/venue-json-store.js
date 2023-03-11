import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/venues.json"));
db.data = { venues: [] };

export const venueJsonStore = {
  async getAllVenues() {
    await db.read();
    return db.data.venues;
  },

  async addVenue(cityId, venue) {
    await db.read();
    venue._id = v4();
    venue.cityid = cityId;
    db.data.venues.push(venue);
    await db.write();
    return venue;
  },

  async getVenuesByCityId(id) {
    await db.read();
    return db.data.venues.filter((venue) => venue.cityid === id);
  },

  async getVenueById(id) {
    await db.read();
    return db.data.venues.find((venue) => venue._id === id);
  },

  async deleteVenue(id) {
    await db.read();
    const index = db.data.venues.findIndex((venue) => venue._id === id);
    db.data.venues.splice(index, 1);
    await db.write();
  },

  async deleteAllVenues() {
    db.data.venues = [];
    await db.write();
  },

  async updateVenue(venue, updatedVenue) {
    venue.venueName = updatedVenue.venueName;
    venue.street = updatedVenue.street;
    venue.genre = updatedVenue.genre;
    await db.write();
  },
};
