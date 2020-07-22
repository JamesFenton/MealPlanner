import express from "express";
import "express-async-errors";
import config from "./config";
import mongoose from "mongoose";
import auth from "./routes/auth";
import ingredients from "./routes/ingredients";
import meals from "./routes/meals";
import seed from "./seeder";

// check config
if (!config.jwtPrivateKey) {
  console.error("jwtPrivateKey not set");
  process.exit(1);
}

// routes
const app = express();
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/ingredients", ingredients);
app.use("/api/meals", meals);
app.use(express.static("public"));

// configure DB & run
mongoose
  .connect(config.mongoConnectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected. Seeding."))
  .then(() => seed())
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((e) => {
    console.error("Could not connect to DB", e);
    process.exit(1);
  });
