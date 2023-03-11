import express from "express";
import cors from "cors";
import { getCharactersAndCode } from "./controller/api.controller";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/charactersAndCode", getCharactersAndCode);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});