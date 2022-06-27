const express = require("express")
const jwt_decode = require('jwt-decode')
const http = require("http")
const expressServer = express()
const httpServer = http.createServer(expressServer)

const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const socketServer = socketIO.listen(httpServer)

let userIdToSocketsMap = new Map()

socketServer.sockets.on("connection", socket => {
    try {
        let userId = extractUserId(socket)
        userIdToSocketsMap.set(userId, socket)
        console.log(`${userId} has been connected, Total clients: ${userIdToSocketsMap.size}`)

        socket.on("disconnect", () => {
            let userId = extractUserId(socket)
            disconnect(userId)
        })

        socket.on("error", function () {
            console.log("skdjhaskdhsjka")
        })

    }
    catch (e) {
        console.error(e)
    }
})

function broadcast(actionName, data) {
    if (!userIdToSocketsMap) {
        return
    }

    if (userIdToSocketsMap.length == 0) {
        return
    }

    for (let socket of userIdToSocketsMap.values()) {
        try {
            socket.emit(actionName, data);
        }
        catch (e) {
            // Intentionally swallowing the exception
            // Preventing a situation where an error with the 2nd socket, will prevent
            // sending to the 3rd, fourth etc. 
            console.error(e)
        }

    }
}

function disconnect(userId) {
    userIdToSocketsMap.delete(userId)
    console.log(`${userId} client has been disconnected. Total clients: ${userIdToSocketsMap.size}`)
}

function extractUserId(socket) {
    var handshakeData = socket.request
    let token = handshakeData._query['token']

    if (!token) {
        throw new Error("Invalid token")
    }

    let decoded = jwt_decode(token)
    let userId = decoded.userId
    return userId
}

httpServer.listen(3002, () => console.log("Socket.IO works, listening..."))

module.exports = {
    broadcast,
    disconnect
}