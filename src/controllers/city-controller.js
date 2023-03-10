import { db } from "../models/db.js";

export const cityController = {
  index: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);
      const viewData = {
        title: "City",
        city: city,
      };
      return h.view("city-view", viewData);
    },
  },

  addVenue: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);
      const newVenue = {
        venueName: request.payload.venueName,
        street: request.payload.street,
        genre: request.payload.genre,
      };
      await db.venueStore.addVenue(city._id, newVenue);
      return h.redirect(`/city/${city._id}`);
    },
  },
};
