# IoT Aircon Panel Backend

## Development setup
1. Clone repo.
2. Install dependencies `npm install`.
3. Create `.env` file in the root folder with following content:

```
PORT=3000
NODE_ENV=development
NODE_APP_TOKEN=token
```

## Development mode
1. Run `tsc -w`
2. Run `nodemon .`


## API interaction
All request to the panel should contai header `Authorization: Bearer $token. 

How to generate the token you may see by following examples into the spec: `test/controllers/api/v1/panel/devices.controller.spec.ts`
