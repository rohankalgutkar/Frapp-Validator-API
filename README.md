Generic validator API to check if a task given as input is available to execute. Also checks for any circular dependencies. The API expects a REST call with input as JSON.

Steps to setup the validalor:
1. Clone the repo and unzip it 
2. Go to the repo folder
3. Install the module dependencies. Open a terminal window to this directory and run: [npm i]
4. Start the server. Run: [node app.js] (Server will start on Port 3000)

Steps to validate an input:
1. Open up any REST client and make a POST call
 to url localhost:3000/validate
 with body (raw) input JSON (type as JSON application/json)  