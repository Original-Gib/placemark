import { db } from "../models/db.js";
import { VenueSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: VenueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("city-view", { title: "Add venue error", errors: error.details }).takeover().code(400);
      },
    },
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

  deleteVenue: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);
      await db.venueStore.deleteVenue(request.params.venueid);
      return h.redirect(`/city/${city._id}`);
    },
  },
};
