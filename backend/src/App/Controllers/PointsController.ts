import { Request, Response } from "express";
import db from "../../database/db";
class PointsController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await db("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not found" });
    }

    const items = await db("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");
    return res.json({
      point,
      items,
    });
  }
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));
    const points = await db("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    res.json({
      points,
    });
  }
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    // estabelece uma transação, só posso executar uma consulta se a outra for bem sucedida
    const trx = await db.transaction();

    const point = {
      image:
        "https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
    // quando eu faço uma inserção o knex me retorna um array com os ids inseridos
    const insertedIds = await trx("points").insert(point, "id");

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default new PointsController();
