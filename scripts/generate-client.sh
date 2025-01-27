#! /usr/bin/env bash

set -e
set -x

cd core
python -c "import app.main; import json; print(json.dumps(app.main.app.openapi()))" > ../openapi.json
cd ..
node portal/modify-openapi-operationids.js
mv openapi.json portal/
cd portal
npm run generate-client
npx biome format --write ./src/client
