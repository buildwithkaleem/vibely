import app from "../src/app.js";
import dbConnection from "../src/config/db.js";

await dbConnection();

export default app;