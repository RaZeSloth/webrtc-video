import {Database} from "quickmongo";

async function start () {
    const db = new Database(process.env.uri)
    await db.connect();
    await db.set("port", process.env.PORT);
    process.exit(0)
}
(async() => {
    await start()
})();