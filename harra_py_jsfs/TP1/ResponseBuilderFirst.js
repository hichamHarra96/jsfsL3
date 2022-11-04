import ResponseBuilderHtml from './ResponseBuilderHtml.js';

export default class ResponseBuilderFirst extends ResponseBuilderHtml {
    constructor(request, response){
        super(request, response);
    }
    
    buildResponse(){  
        super.buildResponse();
        this.response.write('<h1>First page</h1>');
        this.response.write('<link href="./public/style/style.css" rel="stylesheet" type="text/css">');
        this.response.write('<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">');
        this.response.write('<title>First</title>');
        super.endResponse();
    }
}