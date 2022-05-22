import * as fs from 'fs'
import * as path from 'path'
import serve from 'koa-static'
import content from './client'

const filePath = process.env.NODE_ENV === 'production' ? '../dist/'  : '../'

export const template = fs.readFileSync(path.resolve(__dirname, `${filePath}views/index.html`), 'utf8').replace('this is chaxus content', content);

export const staticFile = serve(path.resolve(__dirname, filePath))
