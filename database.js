import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.FILE_NAME = "heroes.json";
  }

  async getFileData() {
    const file = await readFileAsync(this.FILE_NAME, "utf-8");
    return JSON.parse(file.toString());
  }

  writeFile() {}

  async list(id) {
    const data = await this.getFileData();
    const filteredData = data.filter((item) => (id ? item.id === id : true));
    return filteredData;
  }
}

export default new Database();
