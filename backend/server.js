import 'dotenv/config'
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import bodyParser from "body-parser";
import productRoute from "./routes/api.js";
import health from "./routes/health.js";

const PORT = process.env.PORT || 3000;

const file = "./data/products.json";
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ||= { products: [] };
const { products } = db.data

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Library API",
    },
    servers: [
      {
        url: "http://localhost:"+PORT+"/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const app = express();
app.db = db;
app.set('products', { products })

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/product", productRoute);
app.use("/api/health", health);

app.listen(PORT, () => {
  console.log(`Sever is running on the port:`, PORT);
});