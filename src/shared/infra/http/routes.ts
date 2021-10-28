import { Router } from 'express'

import { KafkaProducer } from '../kafka/KafkaProducer'

const routes = Router()

routes.post('/message', async (request, response) => {
  const { topic, message } = request.body

  const kafkaProducer = KafkaProducer.getInstance()

  try {
    await kafkaProducer.send(topic, message)
    response.status(201).json({ message: 'Message sent' })
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
})

export { routes }
