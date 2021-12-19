import express from "express";
import config from "config";
import connect from "./utils/connect";
import routes from "./routes/routes";
import deserializeUser from "./middleware/deserializeUser";
const app = express();

const PORT = config.get<number>("port");
app.use(express.json());
app.use(deserializeUser); //get user from request

app.listen(PORT, async () => {
  await connect(); //connect to mongoDB
  console.log(`App is running on PORT ${PORT}`);
  /// ADD ROUTES FOR THE APP INSTANCE
  routes(app);
});
