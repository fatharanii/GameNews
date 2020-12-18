const {Client} = require ('pg')
//const port = 8000
const connection = "postgres://lcczsojytqgsru:6008c425f1b5441c1e67a72fe0990b8be7a455fd708879e5e3b33becc2326368@ec2-54-205-26-79.compute-1.amazonaws.com:5432/d5cu7fq0a05tcd"

const client = new Client({
    connectionString: connection,
        ssl:{
	        rejectUnauthorized: false
        }
    })

client.connect()
    .then(res => console.log("Connected successfully..."))
    .catch(err => console.log("Connection failed..."));

module.exports = {
    export : function(){
        return client
    }
}