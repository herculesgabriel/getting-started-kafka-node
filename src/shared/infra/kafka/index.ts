import { Kafka, logLevel } from 'kafkajs'

import { kafkaConfig } from '../../../config/kafka'

const kafka = new Kafka({
  clientId: 'getting-started-kafka-node',
  brokers: [`${kafkaConfig.KAFKA_HOST}:${kafkaConfig.KAFKA_PORT}`],
  logLevel: logLevel.ERROR
})

const topics = [
  {
    topic: 'ECOMMERCE_NEW_ORDER',
    numPartitions: 3,
    replicationFactor: 2
  },
  {
    topic: 'ECOMMERCE_CANCEL_ORDER',
    numPartitions: 2,
    replicationFactor: 1
  }
]

kafka
  .admin()
  .listTopics()
  .then(activeTopics => {
    kafka.admin().createTopics({
      topics: topics.filter(topic => !activeTopics.includes(topic.topic))
    })
  })

export { kafka, topics }
