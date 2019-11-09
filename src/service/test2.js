export function testindex(params) {
  console.log('test2index:>>>>>> success', params.msg)
  return new Promise((resolve, reject) => {
    resolve({ 'code': 200, 'message': 'OK', 'data': false })
  })
}