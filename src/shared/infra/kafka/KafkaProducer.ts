import { Producer } from 'kafkajs'

import { kafka, topics } from './index'

class KafkaProducer {
  private producer: Producer

  private static instance: KafkaProducer

  constructor() {
    this.producer = kafka.producer()
  }

  public static getInstance() {
    if (!KafkaProducer.instance) {
      KafkaProducer.instance = new KafkaProducer()
    }

    return KafkaProducer.instance
  }

  public async send(topic: string, message: string) {
    const topicNames = topics.map(each => each.topic)

    if (!topicNames.includes(topic)) {
      throw new Error('Topic does not exist')
    }

    await this.producer.connect()

    await this.producer.send({
      topic,
      messages: [
        {
          key: Date.now().toString(),
          value: JSON.stringify(message)
        }
      ]
    })

    await this.producer.disconnect()
  }
}

export { KafkaProducer }
