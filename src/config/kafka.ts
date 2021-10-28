const { KAFKA_HOST = 'kafka', KAFKA_PORT = '9092' } = process.env

const kafkaConfig = { KAFKA_HOST, KAFKA_PORT }

export { kafkaConfig }
