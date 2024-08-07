import express from "express";
import { CosmosClient } from "@azure/cosmos";
import bodyParser from "body-parser";
import cors from "cors";
import dbConfig from "../dbconfig.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Azure Cosmos DB configuration
const endpoint = dbConfig.endpoint;
const key = dbConfig.key;
const databaseId = dbConfig.databaseId;
const containerId = dbConfig.containerId;

const client = new CosmosClient({ endpoint, key });

async function connectToCosmos() {
  const database = client.database(databaseId);
  const container = database.container(containerId);
  return container;
}

app.get("/", async (req, res) => {
  try {
    const container = await connectToCosmos();
    const { resources } = await container.items.readAll().fetchAll();

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const container = await connectToCosmos();
    const { body } = req;
    const { resource } = await container.items.create(body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
