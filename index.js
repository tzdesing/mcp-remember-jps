import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import sqlite3 from "sqlite3";
import http from "http";

const db = new sqlite3.Database("/data/memory.db");

// Criar tabela de memória se não existir
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS memories (id INTEGER PRIMARY KEY, project TEXT, key TEXT, value TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
});

const server = new Server({ name: "my-squad-memory", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: "save_memory", description: "Salva um fato, decisão ou credencial", inputSchema: { type: "object", properties: { project: { type: "string" }, key: { type: "string" }, value: { type: "string" } } } },
    { name: "get_memory", description: "Busca memórias de um projeto", inputSchema: { type: "object", properties: { project: { type: "string" } } } }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  if (name === "save_memory") {
    return new Promise((resolve) => {
      db.run("INSERT INTO memories (project, key, value) VALUES (?, ?, ?)", [args.project, args.key, args.value], () => resolve({ content: [{ type: "text", text: "Memória salva com sucesso!" }] }));
    });
  }
  if (name === "get_memory") {
    return new Promise((resolve) => {
      db.all("SELECT * FROM memories WHERE project = ?", [args.project], (err, rows) => resolve({ content: [{ type: "text", text: JSON.stringify(rows) }] }));
    });
  }
});

// Health check server for container orchestration
const healthServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
healthServer.listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
