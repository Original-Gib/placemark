import { City } from "./city.js";
import { venueMongoStore } from "./venue-mongo-store.js";

export const cityMongoStore = {
  async getAllCities() {
    const cities = await City.find().lean();
    return cities;
  },

  async getCityById(id) {
    if (id) {
      const city = await City.findOne({ _id: id }).lean();
      if (city) {
        city.venues = await venueMongoStore.getVenuesByCityId(city._id);
      }
      return city;
    }
    return null;
  },

  async addCity(city) {
    const newCity = new City(city);
    const cityObj = await newCity.save();
    return this.getCityById(cityObj._id);
  },

  async getUserCities(id) {
    const city = await City.find({ userid: id }).lean();
    return city;
  },

  async deleteCityById(id) {
    try {
      await City.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCities() {
    await City.deleteMany({});
  },
};
