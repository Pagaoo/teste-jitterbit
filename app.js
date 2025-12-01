import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerConfig.js";
import cors from "cors";

const app = express();

const PORT = 3000;

app.use(cors())
app.use(json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** GET Method */
    /**
     * @openapi
     * '/users':
     *  get:
     *     tags:
     *     - Users
     *     summary: Get all users
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
app.get("/users", (req, res) => {
  res.json([{id: 1, nome: "teste"}]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger rodando na url: http://localhost:${PORT}/api-docs`)
});
