import { Transform } from 'stream'

export class LineBreakTransform extends Transform {
  constructor() {
    super({ readableObjectMode: true })
    this.buffer = ''
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString()

    const lines = this.buffer.split('\n')
    this.buffer = lines.pop()

    for (const line of lines) {
      this.push(line)
    }

    callback()
  }

  _flush(callback) {
    if (this.buffer) {
      this.push(this.buffer)
    }
    callback()
  }
}