# Getting started
## run serverless project offline

``` javaScript
npm start
```
## run sequelize migrations offline

migration up
``` javaScript
npm run miagrate-local
```
migration down
``` javaScript
NODE_ENV=local sls invoke local --function migrate --data "down"
```
## deploy api gateway serverless 

``` javaScript
npm run deploy-dev
```
## run sequelize migrations on deployed api gateway

migration up
``` javaScript
npm run miagrate-dev
```
migration down
``` javaScript
NODE_ENV=dev sls invoke --function migrate --data "down"
```

# Description