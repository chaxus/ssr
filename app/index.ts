/*
 * @Author: ran
 * @Date: 2022-05-19 21:22:52
 * @LastEditors: ran
 * @LastEditTime: 2022-05-19 21:50:52
 */
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { template, staticFile, serverSuccess, resolve } from '@/util'
import { PORT } from '@/constant'
import fs from 'fs'
import process from 'child_process'

const app = new Koa();
const router = new Router();

app.use(staticFile)

router.get('/', (ctx: Context) => {
  ctx.type = 'html';
  ctx.body = template
});

app.use(router.routes());

app.listen(PORT, () => serverSuccess())

fs.watch(resolve('../client'),{ recursive: true }, () => {
  console.log('客户端文件被改变')
  process.exec('./node_modules/.bin/webpack --mode development', (error,stdout,stderr) => {
    console.log('./node_modules/.bin/webpack --mode development', error,stdout,stderr,template)
  })
  // process.exec('../node_modules/.bin/webpack --mode development')
})

