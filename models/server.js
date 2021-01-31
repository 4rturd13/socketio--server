//Express server
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const Sockets = require('./sockets')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //Http server
    this.server = http.createServer(this.app)

    //Socket configuration
    this.io = socketio(this.server, {/* configurations */})
  }

  middlewares(){
    //Show public directory
    this.app.use(express.static(path.resolve(__dirname, '../public')))
  }

  configureSockets(){
    new Sockets(this.io)
  }

  execute(){
    //Initialize middleware
    this.middlewares()

    //Initialize middleware
    this.configureSockets()

    //Initialize server
    this.server.listen(this.port, () => {
      console.log('Server listen on port', this.port)
    })
  }
}

module.exports = Server
