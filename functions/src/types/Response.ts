export class Response {
    code:string='';
    message:string='';
    body:any;
    
    constructor(){
        this.code ='200';
        this.message="NOT RECOGNIZED"
    }
    public static  error(error:any):Response{
        const error_response = new Response();
        error_response.code='001'
        error_response.body= error?.message;
        error_response.message= error?.code || 'internal';
        return error_response
    }
}