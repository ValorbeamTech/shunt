import * as http from 'http'

export interface HttpRequest extends http.IncomingMessage {
    userId?: string,
    roleId?: number
}
export interface HttpResponse extends http.ServerResponse {
    customMethod?(): void;
}