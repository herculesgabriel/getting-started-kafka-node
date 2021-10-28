import { EachMessagePayload } from 'kafkajs'

import { KafkaConsumer } from '../shared/infra/kafka/KafkaConsumer'

async function callback({ message }: EachMessagePayload) {
  const content = JSON.parse(message.value.toString())

  console.log(`[LOG] Ordem cancelada. Realizando reembolso para o usuário...`)
  console.log(
    'Detalhes da compra:\n' +
      `order id: ${content.id}\n` +
      `customer: ${content.client}\n` +
      `total: R$ ${content.total}\n`
  )
}

const refundUser = new KafkaConsumer('ECOMMERCE_CANCEL_ORDER', callback)

export { refundUser }
