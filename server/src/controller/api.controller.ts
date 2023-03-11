import { Request, Response } from "express";
import { generateGrid, generateCode } from "../util/grid.util";

export const getCharactersAndCode = (req: Request, res: Response) => {
  const bias = typeof req.query.bias === "string" && req.query.bias.length > 0 ? req.query.bias : '';
  const grid = generateGrid(bias);
  const code = generateCode(grid.data);

  res.send({"grid": grid.data, "code": code});
};