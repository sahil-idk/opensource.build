#!/bin/bash

echo "🚀 Running database migration..."
echo ""

# Check if POSTGRES_URL is set
if [ -z "$POSTGRES_URL" ]; then
  echo "❌ Error: POSTGRES_URL environment variable not set"
  echo ""
  echo "Please set it first:"
  echo "  export POSTGRES_URL='your-connection-string-from-vercel'"
  exit 1
fi

# Run the migration
psql "$POSTGRES_URL" -f migrations/001_auth_system.sql

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Migration completed successfully!"
  echo "Your authentication tables are ready!"
else
  echo ""
  echo "❌ Migration failed. Check the error above."
  exit 1
fi
