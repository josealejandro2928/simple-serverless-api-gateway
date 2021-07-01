## run serverless project offline

``` javaScript
sls offline start
```
## run sequelize migrations


``` javaScript
sls invoke local --function migrate --data "up"
```
## run sequelize migrations undo

``` javaScript
sls invoke local --function migrate --data "down"
```
If you want to run the migration in the deployment remove the local parameter