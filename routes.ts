import http from 'http';

export function routing(endpoint: string | undefined, _req: http.IncomingMessage, res: http.ServerResponse) {
    switch(endpoint) {
        case 'api':
            sendResponse(res, 200, {"success":true, "message":"Shit!, it works!"})
            break;
        default:
            sendResponse(res, 404, {"success":false, "message":"Ooops!, route is invalid!"})
            break;

    }

}

function sendResponse(res: http.ServerResponse, statusCode: number, data: object) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}
