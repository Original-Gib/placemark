import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";
import { venueJsonStore } from "./venue-json-store.js";

const db = new Low(new JSONFile("./src/models/json/cities.json"));
db.data = { cities: [] };

export const cityJsonStore = {
  async getAllCities() {
    await db.read();
    return db.data.cities;
  },

  async addCity(city) {
    await db.read();
    city._id = v4();
    db.data.cities.push(city);
    await db.write();
    return city;
  },

  async getCityById(id) {
    await db.read();
    const list = db.data.cities.find((city) => city._id === id);
    list.venues = await venueJsonStore.getVenuesByCityId(list._id);
    return list;
  },

  async getUserCities(userid) {
    await db.read();
    return db.data.cities.filter((city) => city.userid === userid);
  },

  async deleteCityById(id) {
    await db.read();
    const index = db.data.cities.findIndex((city) => city._id === id);
    db.data.cities.splice(index, 1);
    await db.write();
  },

  async deleteAllCities() {
    db.data.cities = [];
    await db.write();
  },
};
