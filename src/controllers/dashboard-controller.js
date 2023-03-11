import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const cities = await db.cityStore.getUserCities(loggedInUser._id);
      const viewData = {
        title: "VenueViewer Dashboard",
        user: loggedInUser,
        cities: cities,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCity: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCity = {
        userid: loggedInUser._id,
        cityName: request.payload.cityName,
      };
      await db.cityStore.addCity(newCity);
      return h.redirect("/dashboard");
    },
  },

  deleteCity: {
    handler: async function (request, h) {
      const city = await db.cityStore.getCityById(request.params.id);
      await db.cityStore.deleteCityById(city._id);
      return h.redirect("/dashboard");
    },
  },
};
