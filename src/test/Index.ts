// Make sure to put any pre-condition to make sure your application is running well in here
import '../main/config/Database';

/**
 * WRITING TEST
 *
 * You can specify every unit Tests in here.
 */

async function main() {
  await require("./ExampleTest");
  await require("./UserTest");
}

main().then(() => { console.log("Testing Done. Use CTRL+C or COMMAND+C to close this test run.") });