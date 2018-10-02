const ast = require("./ast-extract")

exports.computeCyclomaticComplexity = function(treegraph)  {
    var edges = 0
    Object.keys(treegraph.edges).forEach(function(key) {
        edges+=treegraph.edges[key].length;
    })
    var nodes = Object.keys(treegraph.nodes).length;

    console.log(edges)
    console.log(nodes)
    return edges-nodes;
}


//extract ast
treegraph = ast.extractFromFile('./input/input.js');

console.log(JSON.stringify(treegraph,null,2))

console.log(exports.computeCyclomaticComplexity(treegraph))
