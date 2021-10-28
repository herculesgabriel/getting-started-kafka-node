import { EachMessagePayload } from 'kafkajs'

import { KafkaConsumer } from '../shared/infra/kafka/KafkaConsumer'

async function callback({ message }: EachMessagePayload) {
  const content = JSON.parse(message.value.toString())

  console.log(`[LOG] Nova ordem criada. Enviando e-mail para o usuário...`)
  console.log(
    'Detalhes da compra:\n' +
      `order id: ${content.id}\n` +
      `customer: ${content.client}\n` +
      `total: R$ ${content.total}\n`
  )
}

const sendMail = new KafkaConsumer('ECOMMERCE_NEW_ORDER', callback)

export { sendMail }
