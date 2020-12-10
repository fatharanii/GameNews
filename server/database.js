const {Client} = require ('pg')
//const port = 8000
const connection = "postgressql://admin:raihan01@localhost:5432/News"

const client = new Client({
    connectionString: connection
    })

client.connect()
    .then(res => console.log("Connected successfully..."))
    .catch(err => console.log("Connection failed..."));

module.exports = {
    export : function(){
        return client
    }
}