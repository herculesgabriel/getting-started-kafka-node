import 'dotenv/config'
import express from 'express'

import { routes } from './routes'

const server = express()

server.use(express.json())
server.use(routes)

const { PORT = 3333 } = process.env

server.listen(PORT, () => {
  console.log(`🚀 server running at port ${PORT}`)
})
