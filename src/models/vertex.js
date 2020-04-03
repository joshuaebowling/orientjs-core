import BaseModel from "./base";

class Vertex extends BaseModel() {
    constructor() {
        console.log('this from vertex',this);
    }

}

export default Vertex;