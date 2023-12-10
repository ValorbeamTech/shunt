
import * as http from 'http'

export interface HttpRequest extends http.IncomingMessage {
    customProperty?: string;
}
export interface HttpResponse extends http.ServerResponse {
    customMethod?(): void;
}