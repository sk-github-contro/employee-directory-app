#!/bin/bash

echo "🔧 Building Employee Directory API..."

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production --no-optional

# Verify critical dependencies
echo "🔍 Verifying dependencies..."
if [ ! -d "node_modules/@apollo/server" ]; then
    echo "❌ @apollo/server not found!"
    exit 1
fi

if [ ! -d "node_modules/express" ]; then
    echo "❌ express not found!"
    exit 1
fi

if [ ! -d "node_modules/mongodb" ]; then
    echo "❌ mongodb not found!"
    exit 1
fi

echo "✅ All dependencies verified!"
echo "🚀 Build completed successfully!"
