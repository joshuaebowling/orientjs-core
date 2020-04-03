import Base from "./Base";

const VertexRepo = {
    getAll: (onDataCallback) => Base.getAll("E", onDataCallback)
}

export default VertexRepo;