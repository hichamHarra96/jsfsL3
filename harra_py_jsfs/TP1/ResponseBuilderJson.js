import ResponseBuilder from './ResponseBuilder.js';

export default class ResponseBuilderJson extends ResponseBuilder {
    #json;

    constructor(request, response){
        super(request, response);
        this.#json = {};
    }

    get json(){
        return this.#json;
    }
    
    prepareResponse() {
        super.prepareResponse();
        this.response.setHeader( 'Content-Type' , 'application/json');
    }
}