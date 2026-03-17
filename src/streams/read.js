import fs from "node:fs"
import readline from 'readline'
import { WriteLog } from "./write.js";

function ToSendWriteStream(){

  const readSTream = fs.createReadStream('src/app.txt', {encoding: 'utf8'})

  const rl = readline.Interface({
    input: readSTream,
    output: process.stdout,
    crlfDelay: Infinity,
    terminal: false
  })

  rl.on('line', (input) => {
    WriteLog(input)
  });
}

ToSendWriteStream()
