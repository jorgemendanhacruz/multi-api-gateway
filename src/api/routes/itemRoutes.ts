import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items (dummy example)
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 */
router.get("/", (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);
});

export default router;