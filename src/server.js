import dotenv from "dotenv";
dotenv.config();

// console.log(result);

// console.log(process.env.TIKTOK_CLIENT_KEY);

import app from "./app.js";
import dbConnection from "./config/db.js";

const PORT = process.env.PORT || 5000;

dbConnection()

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});




// import dotenv from "dotenv";
// dotenv.config();

// import app from "./src/app.js";
// import dbConnection from "./config/db.js";

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await dbConnection();

//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// };

// startServer();