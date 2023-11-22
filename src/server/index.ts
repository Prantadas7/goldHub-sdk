import express from "express";
import router from "./route"

const app = express();
app.use(express.json());
app.use(router)


// app.listen(config.PORT, () => {
//   console.log('=> Server listening on port', config.PORT);
// })
export default app;