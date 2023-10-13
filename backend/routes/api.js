import express from "express";
import products from "../controllers/products.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         -productName
 *         -scrumMasterName
 *         -productOwnerName
 *         -Developers
 *         -startDate
 *         -methodology
 *       properties:
 *         productId:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         scrumMasterName:
 *           type: string
 *           description: The name of the scrum master
 *         productOwnerName:
 *          type: string
 *          description: The name of the product owner
 *         Developers:
 *          type: string
 *          description: The names of developers (up to 5)
 *         startDate:
 *          type: string
 *          description: The date to start to work on this product
 *         methodology:
 *          type: string
 *          description: Agile or Waterfall
 *         localtion:
 *          type: string
 *          description: get from github
 *       example:
 *         productId: '00000001'
 *         productName: 'Astro'
 *         scrumMasterName: 'Elijah'
 *         productOwnerName: 'Benjamin'
 *         Developers: 'Benjamin, Ava, William, James, Evelyn'
 *         startDate: '2020/01/01'
 *         methodology: 'Agile'
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/", (req, res) => {
    products.getList(req,res);
});

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get the product story by productId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by productId
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */

router.get("/:productId", (req, res) => {
    products.getProductById(req, res);
});

/**
 * @swagger
 * /product/:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    products.createProduct(req, res);
});

/**
 * @swagger
 * /product/{productId}:
 *  put:
 *    summary: Update the product by productId
 *    tags: [Products]
 *    parameters:
 *      - name: productId
 *        in: path
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:productId", (req, res) => {
    products.updateProduct(req,res);
});

/**
 * @swagger
 * /product/{productId}:
 *  delete:
 *     summary: Remove the product by productId
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 *       500:
 *        description: Some error happened
 */

router.delete("/:productId", (req, res) => {
    products.delProductById(req, res);
});

export default router;