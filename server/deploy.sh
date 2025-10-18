#!/bin/bash

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Verify installation
echo "✅ Verifying @apollo/server installation..."
if [ -d "node_modules/@apollo/server" ]; then
    echo "✅ @apollo/server found!"
else
    echo "❌ @apollo/server not found!"
    exit 1
fi

# Start the server
echo "🚀 Starting server..."
npm start
