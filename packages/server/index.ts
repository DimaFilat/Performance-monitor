import fastify, { FastifyInstance } from 'fastify'
import fastifyBlipp from 'fastify-blipp'
import { Server, IncomingMessage, ServerResponse } from 'http'

import statusRoutes from './src/modules/routes/status'

const PORT = 8080

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify()

server.register(fastifyBlipp)
server.register(statusRoutes)

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' })
    server.blipp()
  } catch (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }
}

process.on('uncaughtException', (error) => {
  console.error(error)
})
process.on('unhandledRejection', (error) => {
  console.error(error)
})

start()
