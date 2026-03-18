import { Transform } from "node:stream"

export class TransformLog extends Transform {
  constructor() {
    super({ objectMode: true })
    this.countINFO = 0
    this.countWARN = 0
    this.countERROR = 0
    this.countDEBUG = 0
  }

  _transform(chunk, encoding, callback) {
    switch (chunk.level) {
      case "INFO":
        this.countINFO++
        break
      case "WARN":
        this.countWARN++
        break
      case "DEBUG":
        this.countDEBUG++
        break
      case "ERROR":
        this.countERROR++
        break
    }
		
    this.push(chunk)
    callback()
  }

  _flush(callback) {
    this.push({
      type: "summary",
      data: {
        INFO: this.countINFO,
        WARN: this.countWARN,
        ERROR: this.countERROR,
        DEBUG: this.countDEBUG
      }
    })

    callback()
  }
}