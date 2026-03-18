import { Transform } from "node:stream"

export class LineTransformToObject extends Transform {
  constructor() {
    super({ objectMode: true }) 
  }

  _transform(chunk, encoding, callback) {
    const line = chunk.toString()

    const regex = /^\[(.*?)\]\s+\[(.*?)\]\s+(\S+)\s*-\s*(.*)$/
    const match = line.match(regex)

    if (!match) {
      return callback()
    }

    const [, timestamp, level, service, message] = match

    const logObject = {
      timestamp,
      level,
      service,
      message,
      raw: line 
    }

    this.push(logObject)

    callback()
  }
}