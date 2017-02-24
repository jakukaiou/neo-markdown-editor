import '../../node_modules/bulma/css/bulma.css';
import '../scss/test.scss';

class HelloWorld{
    public testText:string;
    constructor(){
        this.testText = "hello world!";
        console.log(this.testText);
    }
}

let hello = new HelloWorld();