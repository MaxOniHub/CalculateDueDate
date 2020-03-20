# Due Date Calculator

# Endpoint
POST https://due-date-calculator-test-app.herokuapp.com/tools/calc

```sh
curl --location --request POST 'https://due-date-calculator-test-app.herokuapp.com/tools/calc' \
--header 'Content-Type: application/json' \
--data-raw '{
	"date": "03/17/2020 02:30 PM",
	"turnaroundTime": 16
}'
```
