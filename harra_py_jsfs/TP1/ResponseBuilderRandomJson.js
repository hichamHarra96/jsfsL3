import ResponseBuilderJson from './ResponseBuilderJson.js';

export default class ResponseBuilderRandomJson extends ResponseBuilderJson {

    constructor(request, response){
        super(request, response);
    }

    buildResponse(){
        const someInt = Math.floor(Math.random() * 101);
        this.json['randomValue'] = someInt; 
        this.response.write(JSON.stringify(this.json));
        super.endResponse();
    }
}