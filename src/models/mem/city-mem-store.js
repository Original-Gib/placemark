import { v4 } from "uuid";

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
    return city.find((city) => city._id === id);
  },

  async deleteCityById(id) {
    const index = city.findIndex((city) => city._id === id);
    city.splice(index, 1);
  },

  async deleteAllCities() {
    cities = [];
  },
};
