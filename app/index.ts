/*
 * @Author: ran
 * @Date: 2022-05-19 21:22:52
 * @LastEditors: ran
 * @LastEditTime: 2022-05-19 21:50:52
 */
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { template, staticFile, openBrower } from '@/util'
import colors from 'colors'
import { PORT } from '@/constant'

const app = new Koa();
const router = new Router();

app.use(staticFile)

router.get('/', (ctx: Context) => {
  ctx.type = 'html';
  ctx.body = template
});

app.use(router.routes());

app.listen(PORT, () => {
  console.info(colors.green(`===========================> Server Start at ${PORT} <===============================`))
  openBrower()
})

