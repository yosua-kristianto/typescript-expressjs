// Make sure to put any pre-condition to make sure your application is running well in here
import {Database} from "../main/config/Database ";
import EloquentTandingan from "../main/config/EloquentTandingan";
Database();

/**
 * WRITING TEST
 *
 * You can specify every unit Tests in here.
 */

async function main() {
    console.log(await EloquentTandingan('po_uma.uma_tbl_users').select('*'))
}

main().then(() => { console.log("Testing Done. Use CTRL+C or COMMAND+C to close this test run.") });