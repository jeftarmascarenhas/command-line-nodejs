import { deepEqual, ok } from "assert";

import database from "./database.js";

const DEFAULT_ITEM_REGISTERED = {
  id: 1,
  name: "Flash",
  power: "Speed",
};

describe("Suit of manipulation of heroes", () => {
  it("should search a specific hero on the list of heroes", async () => {
    const expected = DEFAULT_ITEM_REGISTERED;
    const [result] = await database.list(expected.id); // destructuring was used to get the first position of array
    deepEqual(result, expected);
  });
});
