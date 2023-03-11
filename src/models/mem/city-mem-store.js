import { v4 } from "uuid";
import { venueMemStore } from "./venue-mem-store.js";

let cities = [];

export const cityMemStore = {
  async getAllCities() {
    return cities;
  },

  async addCity(city) {
    city._id = v4();
    cities.push(city);
    return city;
  },

  async getCityById(id) {
    const list = cities.find((city) => city._id === id);
    list.venues = await venueMemStore.getVenuesByCityId(list._id);
    return list;
  },

  async deleteCityById(id) {
    const index = city.findIndex((city) => city._id === id);
    city.splice(index, 1);
  },

  async deleteAllCities() {
    cities = [];
  },

  async getUserCities(userid) {
    return cities.filter((city) => city.userid === userid);
  },
};
