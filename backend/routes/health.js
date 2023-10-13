import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, "../data/products.json");


/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API health check
 *
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Get API health status
 *     description: Check the health status of the API
 *     responses:
 *       200:
 *         description: API is OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       500:
 *         description: API is ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Unable to read/write data file.
 *                 error:
 *                   type: string
 *                   example: Error details
 */
router.get("/", (req, res) => {
    try {
        // Check if the data file can be read from and written to
        fs.accessSync(dataFilePath, fs.constants.R_OK | fs.constants.W_OK);
        res.status(200).send({ status: "OK" });
    } catch (error) {
        res.status(500).send({
          status: "ERROR",
          message: "Unable to read/write data file.",
          error: error.message,
        });
    }
});
export default router;