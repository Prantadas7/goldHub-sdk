import { config } from "./config"
import app from "./server/index"
import VipSquad from "./vipSquad/index"

const main = () => {
  const vip = new VipSquad()
  const start = () => {
    app.listen(config.PORT, () => {
      console.log('=> Server listening on port', config.PORT);
    });
  };
  try { start(); }
  catch (err) {
    console.log(err);
  }
  return vip;
};

export default main;