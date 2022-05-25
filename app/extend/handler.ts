/*
 * @Author: ran
 * @Date: 2022-03-31 22:11:39
 * @LastEditors: ran
 * @LastEditTime: 2022-05-25 12:28:51
 */
import { Context } from 'koa'
import Transmitnotice from 'transmitnotice'
import { DDTOKEN } from '@/lib/constant'
const { ding } = new Transmitnotice()
const dinging = ding(DDTOKEN, {isAtAll:false});
export default {
  /**
   * @description 响应成功处理程序
   * @author cc
   * @param {Context} this
   * @param {*} options
   */
  successHandler(this: Context, options:any) {
    dinging.log(`system: server, env: ${this.app.env}, status: success, requestInfo: ${JSON.stringify(this)},info:`,options);
    this.body = {
      success: true,
      data: options,
      message: '请求成功'
    };
  },

  /**
   * @description 响应失败处理程序
   * @author cc
   * @param {Context} this
   * @param {*} msg 失败信息
   */
  failHander(this: Context, options:any) {
    dinging.error(`system: server, env:${this.app.env}, status: fail, requestInfo:${JSON.stringify(this)}, info:`,options);
    this.body = {
      success: false,
      error: {
        code: 1000,
        ...options
      },
      message: '请求失败'
    };
  },

  /**
   * @description 错误处理程序
   * @author cc
   * @param {Context} this
   * @param {*} error 错误信息
   */
  errorHandler(this: Context, error:any) {
    dinging.error(`system: server, env: ${this.app.env}, status: error, requestInfo: ${JSON.stringify(this)}, info:`,error);
    this.body = {
      success: false,
      error,
    };
  }
};
