/*
 * @Author: ran
 * @Date: 2022-05-19 21:22:52
 * @LastEditors: ran
 * @LastEditTime: 2022-05-19 21:41:04
 */
import { renderToString } from 'react-dom/server';
import Home from '../client/index'
// const bundle = require('../dist/index.bundle').default
import React from 'react';

const content = renderToString(<Home />);
// const content = renderToString(bundle);
console.log('content---->',content)
export default content