export function testindex(params) {
  console.log('test1index:>>>>>> success', params.msg)
  return new Promise((resolve, reject) => {
    resolve({ 'code': 200, 'message': 'OK', 'data': true })
  })
}