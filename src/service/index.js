import * as test1Api from './test1'
import * as test2Api from './test2'
export function testindex(params) {
  console.log('进入方法判断')
  // eval(方法也可以)
  if (params.type === 2) {
    return test1Api.testindex(params)
  }
  return test2Api.testindex(params)
}