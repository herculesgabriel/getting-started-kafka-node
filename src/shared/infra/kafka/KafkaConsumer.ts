import { Consumer, EachMessagePayload } from 'kafkajs'

import { kafka } from './index'

class KafkaConsumer {
  private consumer: Consumer

  private topic: string

  private callback: (payload: EachMessagePayload) => Promise<void>

  constructor(topic: string, callback: (payload: EachMessagePayload) => Promise<void>) {
    this.topic = topic
    this.callback = callback
  }

  public getName = () => this.topic

  public async run() {
    this.consumer = kafka.consumer({ groupId: `consumer-${this.topic}` })

    await this.consumer.connect()
    await this.consumer.subscribe({ topic: this.topic })

    await this.consumer.run({
      eachMessage: async payload => {
        const { topic, partition, message } = payload

        console.log(
          `\n[LOG] Message received: topic ${topic} | partition ${partition} | offset ${message.offset}\n`
        )

        await this.callback(payload)
      }
    })
  }
}

export { KafkaConsumer }
