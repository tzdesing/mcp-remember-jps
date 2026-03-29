# mcp-remember-jps

An MCP (Model Context Protocol) server that provides persistent memory storage for AI assistants using SQLite.

## Features

- Save facts, decisions, and credentials to persistent storage
- Retrieve memories by project
- SQLite-based storage for reliability
- MCP-compatible server using stdio transport

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Tools

### save_memory
Saves a memory entry with a project identifier, key, and value.

**Parameters:**
- `project` (string): Project identifier
- `key` (string): Memory key
- `value` (string): Memory value

### get_memory
Retrieves all memories for a specific project.

**Parameters:**
- `project` (string): Project identifier

## Database

Memories are stored in SQLite database at `/data/memory.db` with the following schema:

```
memories (
  id INTEGER PRIMARY KEY,
  project TEXT,
  key TEXT,
  value TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.0.1
- `sqlite3`: ^5.1.7
