import http from 'http'
import { databaseConnectionWithRetry, port } from './connection/connection'
import { HttpRequest, HttpResponse } from './config/httpInterface'
import { authenticationMiddleWare } from './middleware/authenticationMiddleWare'

const server = http.createServer((req: HttpRequest, res: HttpResponse) => {
  authenticationMiddleWare(req, res)
})


databaseConnectionWithRetry(3).then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})

