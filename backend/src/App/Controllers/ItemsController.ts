import { Request, Response } from "express";
import db from "../../database/db";
class ItemsController {
  async index(req: Request, res: Response) {
    const items = await db("items").select("*");

    const serializedItems = items.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });
    return res.json(serializedItems);
  }
}

export default new ItemsController();
