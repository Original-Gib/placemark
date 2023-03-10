import { v4 } from "uuid";

let venues = [];

export const venueMemStore = {
  async getAllVenues() {
    return venues;
  },

  async addVenue(cityId, venue) {
    venue._id = v4();
    venue.cityid = cityId;
    venues.push(venue);
    return venue;
  },

  async getVenuesByCityId(id) {
    return venues.filter((venue) => venue.cityid === id);
  },

  async getVenueById(id) {
    return venues.find((venue) => venue._id === id);
  },

  async getCityVenues(cityId) {
    return venues.filter((venue) => venue.cityid === cityId);
  },

  async deleteVenue(id) {
    const index = venues.findIndex((venue) => venue._id === id);
    venues.splice(index, 1);
  },

  async deleteAllVenues() {
    venues = [];
  },

  async updateVenue(venue, updatedVenue) {
    track.venueName = updatedVenue.venueName;
    track.street = updatedVenue.street;
    track.genre = updatedVenue.genre;
  },
};
