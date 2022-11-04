import { readFileSync } from 'fs';
import ResponseBuilder from './ResponseBuilder.js';

export default class ResponseBuilderPublic extends ResponseBuilder {

    constructor(request, response){
        super(request, response);
    }
    
    prepareResponse() {
        super.prepareResponse();
        this.response.setHeader('Content-Type' , 'text/plain');
    }
    
    buildResponse(){
        const path = this.url.pathname;
        try{
            const data = readFileSync(`.${path}`);
            this.response.write(data);
        } catch (err){
            this.response.statusCode = 404;
            this.response.write('Le chemin "' + this.url.pathname + '" n\'existe pas.');
        }
        super.endResponse();
    }
}