import ResponseBuilder from './ResponseBuilder.js';

export default class ResponseBuilderHtml extends ResponseBuilder {
    constructor(request, response){
        super(request, response);
    }

    prepareResponse() {
        super.prepareResponse();
        this.response.setHeader( 'Content-Type' , 'text/html');
    }
    
    buildResponse(){  
        this.response.write('<html><head>');
        this.response.write('<link href="./public/style/style.css" rel="stylesheet" type="text/css">');
        this.response.write('</head><body>');
    }

    endResponse() {
        const date = new Date();
        this.response.write('<footer>' + date.toLocaleTimeString() +'</footer>');
        this.response.write('</body></html>');
        this.response.end();
    }
}