
var NODE_ID_COUNTER = 0

var NODE_LOOKUP={}

var EDGES = {}

exports.createGraph= function(root=null) {
    return {
        root: exports.createNode(root)
    }
}

exports.createNode = function(data = {}) {
    id= NODE_ID_COUNTER++
    n = {
        id: id,
        data:data
    }
    NODE_LOOKUP[id] = n;

    console.log(`created node ${id}`)
    console.log(data)
    return n;
}

exports.getNodeByID = function(id)  {
    return NODE_LOOKUP[id];
}

exports.addEdge = function(parent_id, child_id)  {
    console.log(`adding edge ${parent_id} -> ${child_id}`)
    if(!EDGES[parent_id])  {
        EDGES[parent_id] = []
    }

    EDGES[parent_id].push(child_id)
}

exports.printState = function()  {
    return JSON.stringify(exports.getObj(), null, 2);
    
}

exports.exportState = function()  {
    var fs = require('fs');
    fs.writeFile("graph.out.json",exports.printState(), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

exports.getObj = function() {
    return {
        nodes: NODE_LOOKUP,
        edges: EDGES
    }
}

exports.loadGraph = function(file_location) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(file_location, 'utf8'));
}
