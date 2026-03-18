import fs from 'node:fs'
import { LineBreakTransform } from './LineBreakTransform.js'
import { TransformLog } from './transformFile.js'
import { WriteLog } from './writeFile.js'
import { LineTransformToObject } from './LineTransformToObject.js'

fs.createReadStream('src/app.txt', { encoding: 'utf8' })
  .pipe(new LineBreakTransform())
  .pipe(new LineTransformToObject())
  .pipe(new TransformLog())      
  .pipe(new WriteLog())             