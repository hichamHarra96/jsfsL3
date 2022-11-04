import ResponseBuilderJson from './ResponseBuilderJson.js';

export default class ResponseBuilderJsonParams extends ResponseBuilderJson {

    constructor(request, response){
        super(request, response);
    }
    
    buildResponse(){
        const params = new URLSearchParams(super.url.search);
        const date = new Date();
        
        for (const [key, value] of params) {
            this.json[key] = value;           
        }
        this.json['date'] = date; 
        this.response.write(JSON.stringify(this.json));
        super.endResponse();
    }
}