#!/bin/bash

echo "=== Testando MCP Memory Server ==="
echo ""

# Teste 1: Listar ferramentas disponíveis
echo "📋 Teste 1: Listando ferramentas..."
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node index.js
echo ""

# Teste 2: Salvar memória
echo "💾 Teste 2: Salvando memória..."
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"save_memory","arguments":{"project":"harpo","key":"db","value":"postgres"}}}' | node index.js
echo ""

# Teste 3: Recuperar memória
echo "🔍 Teste 3: Recuperando memória..."
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_memory","arguments":{"project":"harpo"}}}' | node index.js
echo ""

echo "✅ Testes concluídos!"
