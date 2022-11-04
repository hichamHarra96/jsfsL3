import { URL } from 'url';
import ResponseBuilderFirst from './ResponseBuilderFirst.js';
import ResponseBuilderSecond from './ResponseBuilderSecond.js';
import ResponseBuilderJsonParams from './ResponseBuilderJsonParams.js';
import ResponseBuilderRandomJson from './ResponseBuilderRandomJson.js';
import ResponseBuilderPublic from './ResponseBuilderPublic.js';

export default class RequestController {

    #request;
    #response;
    #url;

    constructor (request, response) {
        this.#request = request;
        this.#response = response;
        this.#url = new URL(request.url, 'http://${request.headers.host}');
    }

    get response() {
        return this.#response;
    }

    handleRequest(){
        this.prepareResponse();
        this.buildResponse();
    }

    prepareResponse() {
        this.response.statusCode = 200;
        this.response.setHeader('Content-Type' , 'text/html');
    }
    
    buildResponse() {
        if (this.#url.pathname == '/'){
            this.response.write('<h1>Bonjour</h1>');
            this.response.write('<title>Accueil</title>');
            this.response.end();
        }
        else if (this.#url.pathname.startsWith('/first') ) {
            const first = new ResponseBuilderFirst(this.#request, this.#response);
            first.handleRequest(); 
        }
        else if (this.#url.pathname.startsWith('/second')) {
            const second = new ResponseBuilderSecond(this.#request, this.#response);
            second.handleRequest();
        }
        else if (this.#url.pathname.startsWith('/json')) {
            const json = new ResponseBuilderJsonParams(this.#request, this.#response);
            json.handleRequest();
        }
        else if (this.#url.pathname.startsWith('/random')) {
            const rand = new ResponseBuilderRandomJson(this.#request, this.#response);
            rand.handleRequest();
        }
        else if (this.#url.pathname.startsWith('/public')) {
            const pub = new ResponseBuilderPublic(this.#request, this.#response);
            pub.handleRequest();
        }
        else {
            this.response.write('<h1>404 : page not found</h1>');
            this.response.write('<p>Dommage</p>');
            this.response.end();
        }    
    }

}