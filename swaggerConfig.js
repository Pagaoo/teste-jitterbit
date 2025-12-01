import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const swaggerSpecPath = path.resolve(process.cwd(), "swagger.yaml");

const swaggerDefinition = yaml.load(fs.readFileSync(swaggerSpecPath, "utf8"));

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
