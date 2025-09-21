import http from 'http';

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/menu-items',
  method: 'GET'
}

const req = http.request(options, (res) => {
  let data = ''
  
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode)
    console.log('Response Headers:', res.headers)
    console.log('Response Body:')
    console.log(JSON.stringify(JSON.parse(data), null, 2))
  })
})

req.on('error', (error) => {
  console.error('Error:', error)
})

req.end()