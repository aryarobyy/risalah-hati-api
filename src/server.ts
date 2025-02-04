import app from "./app";
import dotenv from "dotenv";
import { normalizePort } from "./utils/normalizePort";
import { PORT } from "./data/appData";

dotenv.config();

const port = normalizePort(PORT);

app.listen(port, '0.0.0.0',  () => {
    console.log(`Running on port ${port}`);
});