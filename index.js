import { Command } from "commander";

import Database from "./database.js";
import Hero from "./hero.js";

async function main() {
  const program = new Command();
  program
    .version("v1")
    .option("-n --name [value]", "Hero name")
    .option("-p --power [value]", "Hero power")
    .option("-i --id [value]", "Hero Id")
    .option("-r --register", "Register a Hero")
    .option("-l --list", "List Heroes")
    .option("-r --remove", "Remove Hero by Id")
    .option("-u --update [value]", "Update Hero by Id")
    .parse(process.argv);

  const options = program.opts();
  const hero = new Hero(options);
  try {
    if (options.register) {
      delete hero.id;
      const result = await Database.register(hero);
      if (!result) {
        console.error("Hero was not registered");
        return;
      }
      console.log("Successfully");
    }
    if (options.list) {
      const result = await Database.list();
      console.log(result);
      return;
    }
    if (options.remove) {
      const result = await Database.remove(hero.id);
      if (!result) {
        console.error("Was not possible remove the hero");
        return;
      }
      console.log("Removed");
    }
    if (options.update) {
      delete hero.id;
      const idToUpdate = parseInt(options.update);
      const result = await Database.update(idToUpdate, hero);
      if (!result) {
        console.error("Was not possible update the hero");
        return;
      }
      console.log("Updated");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
