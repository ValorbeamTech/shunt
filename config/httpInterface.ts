
import * as http from 'http'

export interface HttpRequest extends http.IncomingMessage {
}
export interface HttpResponse extends http.ServerResponse {
}