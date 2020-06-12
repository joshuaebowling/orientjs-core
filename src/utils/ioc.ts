// /// <reference path="../../index.d.ts"/>
// import Log from "./log";
// import connection from "../data/connection";
// import Config from "config";

// const db = Config.db;

// const IoC:Utils.IoC = {
//     Log,
//     Connection: async () => connection({address: db.host, port: db.port, db: db.dbName, user: db.user, pass: db.pass})
// }

// export default IoC;