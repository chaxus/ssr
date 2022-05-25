/*
 * @Author: ran
 * @Date: 2022-02-21 18:17:07
 * @LastEditors: ran
 * @LastEditTime: 2022-05-25 12:35:27
 */
import Application from 'koa'
import { resolve } from 'path'
import routerConfig from '@/router/router.config'
import Router from 'koa-router'
import fs from 'fs'
import colors from "colors";

type requestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

const dir = resolve(__dirname, '../controllers')


const routing = (app: Application) => {
  const router = new Router()
  const routerKeys = Object.keys(routerConfig);
  const controller: Partial<Record<string, any>> = {}
  fs.readdirSync(dir).forEach((file: string) => {
    const route = require(`${dir}/${file}`).default
    // const type = Reflect.toString.call(route)
    const [key, _] = file.split('.')
    controller[key] = new route()
  })
  const size = routerKeys.length
  for (let i = 0; i < size; i++) {
    const controllerOptions = routerConfig[routerKeys[i] as keyof typeof routerConfig].split('#');
    const [controllerName, controllerMethod, routeEnv] = controllerOptions;
    const requestMethodOptions = routerKeys[i].split('=>');
    const [method, url] = requestMethodOptions;
    // if ((routeEnv && routeEnv === app.config.env) || !routeEnv) {
      // 判断路由是否是符合正则规范
      if (url.includes('#')) {
        const regArr = url.split('#');
        if (!!regArr.length && /^(\/.*\/$)/.test(regArr[1])) {
          const regUrl = new RegExp(regArr[1].substring(1, regArr[1].length - 1));
          router[method as requestMethod](regUrl, controller[controllerName][controllerMethod]);
        } else {
          console.info(colors.red('当前环境未生效路由：%s, 当前环境：%s, 路由设置环境：%s'), routerKeys[i], routeEnv);
        }
      } else {
        router[method as requestMethod](url, controller[controllerName][controllerMethod]);
      }
      console.info(colors.green('当前环境生效路由：%s, 当前环境：%s, 路由设置环境：%s'), routerKeys[i], routeEnv);
    // } else {
    //   console.info(colors.red('当前环境未生效路由：%s, 当前环境：%s, 路由设置环境：%s'), routerKeys[i], app.config.env, routeEnv);
    // }
  }
  app.use(router.routes()).use(router.allowedMethods())
}
export default routing