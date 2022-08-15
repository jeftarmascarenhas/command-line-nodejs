import { readFile, writeFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  #FILE_NAME;
  constructor() {
    this.#FILE_NAME = "heroes.json";
  }

  async #getFileData() {
    const file = await readFileAsync(this.#FILE_NAME, "utf-8");
    return JSON.parse(file.toString());
  }

  async #writeFile(data) {
    await writeFileAsync(this.#FILE_NAME, JSON.stringify(data));
    return true;
  }

  async register(hero) {
    const data = await this.#getFileData();
    const id = hero.id <= 1 ? hero.id : Date.now();
    const heroWithId = {
      id,
      ...hero,
    };
    const finalData = [...data, heroWithId];

    const result = await this.#writeFile(finalData);
    return result;
  }

  async remove(id) {
    if (!id) {
      return await this.#writeFile([]);
    }
    const heroList = await this.#getFileData();
    const index = heroList.findIndex((hero) => hero.id === id);

    if (index === -1) {
      throw Error("User does not exists");
    }

    heroList.splice(index, 1);

    return await this.#writeFile(heroList);
  }

  async update(id, data) {
    const heroList = await this.#getFileData();
    const index = heroList.findIndex((hero) => hero.id === id);
    if (index === -1) {
      throw Error("User does not exists");
    }

    heroList.splice(index, 1, { ...data, id });

    return await this.#writeFile(heroList);
  }

  async list(id) {
    const data = await this.#getFileData();
    const filteredData = data.filter((item) => (id ? item.id === id : true));
    return filteredData;
  }
}

export default new Database();
