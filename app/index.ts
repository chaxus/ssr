/*
 * @Author: ran
 * @Date: 2022-05-19 21:22:52
 * @LastEditors: ran
 * @LastEditTime: 2022-05-19 21:50:52
 */
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import * as fs from 'fs'
import * as path from 'path'
import serve from 'koa-static'
import content from './client'


const app = new Koa();
const router = new Router();

const template = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

app.use(serve(path.resolve(__dirname, '../dist')));
app.use(serve(path.resolve(__dirname, '../')));
console.log('template---->',template.replace('<div>这是模版</div>', content))
router.get('/', (ctx: Context) => {
  // const content = renderToString(App);
  // const content = renderToString(bundle);
  ctx.type = 'html';
  ctx.body = template.replace('<div>这是模版</div>', content);
});

app.use(router.routes());

app.listen(30102);

console.log('Application is running on http://localhost:30102');

