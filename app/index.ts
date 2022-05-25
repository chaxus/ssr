/*
 * @Author: ran
 * @Date: 2022-05-19 21:22:52
 * @LastEditors: ran
 * @LastEditTime: 2022-05-25 12:36:16
 */
import Koa from 'koa';
import { template, staticFile, serverSuccess } from '@/lib/util'
import { PORT } from '@/lib/constant'
import fs from 'fs'
import process from 'child_process'
import routing from '@/router/router'
import path from 'path'

const app = new Koa();

// 配置ssr静态文件地址
app.use(staticFile)

// 路由设置
routing(app)

app.listen(PORT, () => serverSuccess())

fs.watch(path.resolve(__dirname,'../client'),{ recursive: true }, () => {
  console.log('客户端文件被改变')
  process.exec('./node_modules/.bin/webpack --mode development', (error,stdout,stderr) => {
    console.log('./node_modules/.bin/webpack --mode development', error,stdout,stderr,template)
  })
  // process.exec('../node_modules/.bin/webpack --mode development')
})

