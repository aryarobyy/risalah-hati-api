import app from "./app";
import dotenv from "dotenv";
import { normalizePort } from "./utils/normalizePort";
import { PORT } from "./data/appData";

dotenv.config();

const port = normalizePort(PORT);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});