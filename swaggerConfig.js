import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Teste Jitterbit",
      version: "1.0.0",
      description: "Api para teste técnico com express e swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "local server"
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;
