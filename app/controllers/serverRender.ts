/*
 * @Author: ran
 * @Date: 2022-05-25 12:18:43
 * @LastEditors: ran
 * @LastEditTime: 2022-05-25 12:22:42
 */

import { Context } from 'koa'
import { template } from '@/lib/util'

export default  class ServerRender {
  home(ctx: Context){
    ctx.type = 'html';
    ctx.body = template
  }
}