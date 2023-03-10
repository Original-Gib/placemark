import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const cities = await db.cityStore.getAllCities();
      const viewData = {
        title: "VenueViewer Dashboard",
        cities: cities,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCity: {
    handler: async function (request, h) {
      const newCity = {
        cityName: request.payload.cityName,
      };
      await db.cityStore.addCity(newCity);
      return h.redirect("/dashboard");
    },
  },
};
