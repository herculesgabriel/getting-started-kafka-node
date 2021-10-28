import './shared/infra/http/server'
import * as consumers from './consumers'

(async function start() {
  const promises = Object.values(consumers).map(
    consumer =>
      new Promise(async resolve => {
        try {
          console.log(`[LOG] Consumer ${consumer.getName()} starting...`)
          await consumer.run()
          console.log(`[LOG] Consumer ${consumer.getName()} started`)
        } catch (error) {
          console.error(
            `[ERROR] Error when starting consumer ${consumer.getName()}:\n${error}`
          )
        }
        resolve('')
      })
  )

  await Promise.all(promises)

  console.log(`[LOG] All consumers started`)
})()
