import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../src/models/db.js";
import { cities, dublin } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

EventEmitter.setMaxListeners(25);

suite("City Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.cityStore.deleteAllCities();
    for (let i = 0; i < cities.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      cities[i] = await db.cityStore.addCity(cities[i]);
    }
  });

  test("create a city", async () => {
    const city = await db.cityStore.addCity(dublin);
    assertSubset(dublin, city);
    assert.isDefined(city._id);
  });

  test("delete all cities", async () => {
    let returnedCities = await db.cityStore.getAllCities();
    assert.equal(returnedCities.length, 3);
    await db.cityStore.deleteAllCities();
    returnedCities = await db.cityStore.getAllCities();
    assert.equal(returnedCities.length, 0);
  });

  test("get a city - success", async () => {
    const city = await db.cityStore.addCity(dublin);
    const returnedCity = await db.cityStore.getCityById(city._id);
    assertSubset(dublin, city);
  });

  test("delete One City - success", async () => {
    const id = cities[0]._id;
    await db.cityStore.deleteCityById(id);
    const returnedCities = await db.cityStore.getAllCities();
    assert.equal(returnedCities.length, cities.length - 1);
    const deletedCity = await db.cityStore.getCityById(id);
    assert.isNull(deletedCity);
  });

  test("get a city - bad params", async () => {
    assert.isNull(await db.cityStore.getCityById(""));
    assert.isNull(await db.cityStore.getCityById());
  });

  test("delete One City - fail", async () => {
    await db.cityStore.deleteCityById("bad-id");
    const allCities = await db.cityStore.getAllCities();
    assert.equal(cities.length, allCities.length);
  });
});
