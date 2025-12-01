import "dotenv/config"; // Carrega o .env primeiro
import express, { json } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerConfig.js";
import {
  initializeDB,
  testConnection,
  initializeSchema,
  query,
  transaction,
} from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    initializeDB();
    await testConnection();
    await initializeSchema();
  } catch (error) {
    console.error("Falha ao iniciar o servidor ou conectar ao DB.", error);
    process.exit(1);
  }

  app.use(cors());
  app.use(json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.post("/order", async (req, res) => {
    const { numeroPedido, valorTotal, dataCriacao, Items } = req.body;

    if (!numeroPedido || !valorTotal || !Items || Items.length === 0) {
      return res
        .status(400)
        .json({ error: "Dados do pedido incompletos ou itens ausentes." });
    }

    try {
      await transaction(async (client) => {
        const orderInsertQuery = `
                    INSERT INTO "Order" (orderid, value, creationdate) 
                    VALUES ($1, $2, $3);
                `;
        await client.query(orderInsertQuery, [
          numeroPedido,
          valorTotal,
          dataCriacao,
        ]);

        for (const item of Items) {
          const itemInsertQuery = `
                        INSERT INTO Items (orderid, productid, quantity, price) 
                        VALUES ($1, $2, $3, $4);
                    `;
          await client.query(itemInsertQuery, [
            numeroPedido,
            item.idItem,
            item.quantidadeItem,
            item.valorItem,
          ]);
        }
      });

      res
        .status(201)
        .json({ message: "Pedido criado com sucesso!", numeroPedido });
    } catch (error) {
      if (error.code === "23505") {
        return res
          .status(400)
          .json({ error: `O pedido com ID ${numeroPedido} já existe.` });
      }
      console.error("Erro na criação do pedido:", error);
      res
        .status(500)
        .json({ error: "Erro interno do servidor ao processar o pedido." });
    }
  });

  app.get("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;

    try {
      const orderQuery = `
                SELECT "orderid", value, "creationdate" 
                FROM "Order" 
                WHERE "orderid" = $1;
            `;
      const orderResult = await query(orderQuery, [orderId]);
      const order = orderResult.rows[0];

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado." });
      }

      const itemsQuery = `
                SELECT "productid", quantity, price 
                FROM Items 
                WHERE "orderid" = $1;
            `;
      const itemsResult = await query(itemsQuery, [orderId]);

      const completeOrder = {
        numeroPedido: order.orderid,
        valorTotal: order.value,
        dataCriacao: order.creationdate,
        Items: itemsResult.rows.map((item) => ({
          idItem: item.productid,
          quantidadeItem: item.quantity,
          valorItem: item.price,
        })),
      };

      res.status(200).json(completeOrder);
    } catch (error) {
      console.error("Erro ao buscar o pedido:", error);
      res
        .status(500)
        .json({ error: "Erro interno do servidor ao buscar o pedido." });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger rodando na url: http://localhost:${PORT}/api-docs`);
  });
}

startServer();
