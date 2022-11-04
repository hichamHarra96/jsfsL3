import ResponseBuilderHtml from './ResponseBuilderHtml.js';

export default class ResponseBuilderSecond extends ResponseBuilderHtml{
    
    constructor(request, response){
        super(request, response);
    }
    
    buildResponse(){  
        super.buildResponse();
        this.response.write('<h1>Second page</h1>');
        this.response.write('<title>Second</title>');
        super.endResponse();
    }
}