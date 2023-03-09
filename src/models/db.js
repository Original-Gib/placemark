import { userMemStore } from "./mem/user-mem-store.js";
import { cityMemStore } from "./mem/city-mem-store.js";

export const db = {
  userStore: null,
  cityStore: null,

  init() {
    this.userStore = userMemStore;
    this.cityStore = cityMemStore;
  },
};
