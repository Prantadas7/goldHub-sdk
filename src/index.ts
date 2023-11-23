import { config } from "./config"
import app from "./server/index"
import VipSquad from "./vipSquad/index"

/**
 * Main function to initialize and start the application server.
 * Also, creates an instance of the VipSquad class.
 *
 * @returns {VipSquad} - An instance of the VipSquad class.
 */
const main = (): VipSquad => {
  // Instantiates the VipSquad class
  const vip = new VipSquad();

  /**
   * Starts the application server and listens on the configured port.
   *
   * @throws {Error} - If an error occurs while starting the server.
   */
  const start = () => {
    app.listen(config.PORT, () => {
      console.log('=> Server listening on port', config.PORT);
    });
  };

  try {
    // Attempts to start the server
    start();
  } catch (err) {
    // Logs any errors that occur during server startup
    console.log(err);
  }

  // Returns the instance of the VipSquad class
  return vip;
};

export default main;
