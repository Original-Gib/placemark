// import { userMemStore } from "./mem/user-mem-store.js";
// import { cityMemStore } from "./mem/city-mem-store.js";
// import { venueMemStore } from "./mem/venue-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { cityJsonStore } from "./json/city-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";

export const db = {
  userStore: null,
  cityStore: null,
  venueStore: null,

  init() {
    this.userStore = userJsonStore;
    this.cityStore = cityJsonStore;
    this.venueStore = venueJsonStore;
  },
};
