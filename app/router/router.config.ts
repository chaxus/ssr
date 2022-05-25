/*
 * @Author: ran
 * @Date: 2022-01-30 19:34:39
 * @LastEditors: ran
 * @LastEditTime: 2022-05-25 12:22:57
 */
/**
 * 路由配置： '${method}=>${path}: ${controller}#${controllerMethod}#${env}'
 * method: 请求方法 GET｜POST
 * path: 请求链接 /api/index
 * controller: 本次请求对应的处理controller
 * controllerMethod: 本次请求对应的controller中的具体的处理方法
 * env: 该路由在什么环境中生效 local|test|staging|prod 不同环境的路由可以放到一起
 */
const serverRender = {
  // 获取主页
  "get=>/": "serverRender#home",
};

export default {
  ...serverRender,
};
