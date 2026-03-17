import fs from 'node:fs'

const writeStream = fs.createWriteStream("output.txt")

export async function WriteLog(line){
  await writeStream.write(line + "\n")  

  writeStream.end()

  console.log("PROCESSANDO LINHAS:", writeStream)
}