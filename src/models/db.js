import { userMemStore } from "./mem/user-mem-store.js";
import { cityMemStore } from "./mem/city-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { cityJsonStore } from "./json/city-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { cityMongoStore } from "./mongo/city-mongo-store.js";

export const db = {
  userStore: null,
  cityStore: null,
  venueStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.cityStore = cityJsonStore;
        this.venueStore = venueJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.cityStore = cityMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.cityStore = cityMemStore;
        this.venueStore = venueMemStore;
    }
  },
};
