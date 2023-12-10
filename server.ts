import http from 'http'
import { databaseConnectionWithRetry, port } from './connection/connection'
import { HttpRequest, HttpResponse } from './config/httpInterface'
import { route } from './route/route'

const server = http.createServer((req: HttpRequest, res: HttpResponse) => {
  route(req, res)
})


databaseConnectionWithRetry(3).then((res) => {
  console.log("response", res)
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})

