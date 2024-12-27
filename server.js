// const express = require('express')
// const app = express()

// app.listen(3000)

//PARA O FASTIFY FUNCIONAR LEBRE DE COLOCAR EM package.json abaixo de
// "main": "index.js",' coloque '  "type": "module",'

import fastify from "fastify";
// import {DataBaseMemory} from "./database-memory.js"
import { DataBasePostgres } from "./database.postgres.js";

const server = fastify();
// const database = new DataBaseMemory()
const database = new DataBasePostgres

//Create a new video
server.post("/videos", async (req, res) => {
    const {title,description,duration} = req.body
    await database.create({
        title,
        description,
        duration
    })
    console.log(database.list())
    return res.status(201).send({message:"video criado"})
}) 


//Read  videos
server.get("/videos", async (req,res) => {
    const search = req.query.search
    const videos = await database.list(search)
    return videos
})

//Update a video
server.put("/videos/:id", async (req,res) => {
    const videoId = req.params.id
    const {title,description,duration} = req.body
    await database.update(videoId,{
        title,
        description,
        duration
    })

    return res.status(204).send()
})

//Delete a video
server.delete("/videos/:id", (req,res) => {
    const videoId = req.params.id
    database.delete(videoId)
    return res.status(204).send()
})

server.listen({ 
    host: "0.0.0.0",
    port: process.env.PORT ?? 3333
})

