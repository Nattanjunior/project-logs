import { Writable } from 'stream'
import fs from 'node:fs'

export class WriteLog extends Writable {
  constructor() {
    super({ objectMode: true })

    this.writeInfoStream = fs.createWriteStream('infoLog.txt')
    this.writeWarnStream = fs.createWriteStream('warnLog.txt')
    this.writeErrorStream = fs.createWriteStream('errorLog.txt')
    this.writeDebugStream = fs.createWriteStream('debugLog.txt')

    this.summaryStream = fs.createWriteStream('summary.json')
  }

  _write(chunk, encoding, callback) {
    try {
      if (chunk.type === "summary") {
        this.summaryStream.write(JSON.stringify(chunk.data, null, 2))
        return callback()
      }

      if (chunk.level === "INFO") {
        this.writeInfoStream.write(chunk.raw + '\n')
      } else if (chunk.level === "WARN") {
        this.writeWarnStream.write(chunk.raw + '\n')
      } else if (chunk.level === "ERROR") {
        this.writeErrorStream.write(chunk.raw + '\n')
      } else if (chunk.level === "DEBUG") {
        this.writeDebugStream.write(chunk.raw + '\n')
      }

      callback()
    } catch (err) {
      callback(err)
    }
  }

  _final(callback) {
    this.writeInfoStream.end()
    this.writeWarnStream.end()
    this.writeErrorStream.end()
    this.writeDebugStream.end()
    this.summaryStream.end()

    callback()
  }
}