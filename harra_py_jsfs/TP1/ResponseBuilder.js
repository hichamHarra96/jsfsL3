import { URL } from 'url';

export default class ResponseBuilder {

    #request;
    #response;
    #url;

    constructor(request, response) {
        this.#request = request,
        this.#response = response;
        this.#url = new URL(request.url, `http://${request.headers.host}`);
    }

    get response() {
        return this.#response;
    }

    get url() {
        return this.#url;
    }
    
    handleRequest() {
        this.prepareResponse();
        this.buildResponse();
    }
    
    prepareResponse() {
        this.response.statusCode = 200;
    }
    
    buildResponse(){  
        this.response.write('<html><head></head><body>');
    }

    endResponse() {
        this.response.end();
    }
}