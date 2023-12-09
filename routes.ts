import http from 'http'
import { Crud } from './src/controllers/Crud'

export function routing(endpoint: string | undefined, req: http.IncomingMessage, res: http.ServerResponse) {
    const crud = new Crud(req, res)
    switch(endpoint) {
        case 'api':
            sendResponse(res, 200, {"success":true, "message":"Shit!, it works!"})
            break
        case 'api/users/create':
            let body = ''
            req.on('data', (chunk)=>{
                body += chunk
            })
            req.on('end', ()=> {
                const data = JSON.parse(body);
                crud.create(data); // Pass the valid object to create method
            })
            break
        default:
            sendResponse(res, 404, {"success":false, "message":"Ooops!, route is invalid!"})
            break

    }

}

export function sendResponse(res: http.ServerResponse, statusCode: number, data: object) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
