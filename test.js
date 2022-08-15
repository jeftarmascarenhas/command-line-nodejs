import { deepEqual, equal, throws } from "assert";

import database from "./database.js";

const DEFAULT_ITEM_REGISTERED = {
  id: 1,
  name: "Flash",
  power: "Speed",
};

describe("Suit of manipulation of heroes", () => {
  before(async () => {
    await database.register(DEFAULT_ITEM_REGISTERED);
  });

  it("should search a specific hero on the list of heroes", async () => {
    const expected = DEFAULT_ITEM_REGISTERED;
    const [result] = await database.list(expected.id); // destructuring was used to get the first position of array
    deepEqual(result, expected);
  });

  it("should register a hero, using files", async () => {
    const newHero = {
      id: 2,
      name: "Batman",
      power: "Smart",
    };
    const expected = newHero;
    await database.register(newHero);
    const [actual] = await database.list(newHero.id);

    deepEqual(actual, expected);
  });

  it("should remove a hero", async () => {
    const expected = true;
    const result = await database.remove(DEFAULT_ITEM_REGISTERED.id);

    equal(result, expected);
  });

  // it("should return error 'User does not exists'", async () => {
  //   const expected = new Error("User does not exists");
  //   const result = await database.remove(100);
  //   console.log(result);
  //   throws(() => {
  //     throw expected;
  //   }, result);
  // });

  it("should update hero by id", async () => {
    const hero = {
      id: DEFAULT_ITEM_REGISTERED.id,
      name: "Black Flash",
      power: "Super Speed",
    };

    const expected = hero;
    await database.update(DEFAULT_ITEM_REGISTERED.id, hero);

    const [actual] = await database.list(DEFAULT_ITEM_REGISTERED.id);

    deepEqual(actual, expected);
  });
});
