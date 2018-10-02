const acorn = require("acorn")
const walk = require("acorn-walk")

const graph = require("./graph-gen")


function addChild(acorn_child, parent) {
    var child = parseNode(acorn_child)
    graph.addEdge(parent.id, child.id)
}

function parseNode(acorn_node) {
    console.log("\nparsing...")
    var new_node = graph.createNode(JSON.stringify({
        type:acorn_node.type,
        start:acorn_node.start,
        end:acorn_node.end,
    }))

    possible_next_single = [
        "argument",
        "callee",
        "declaration",
        "expression","element","exported",
        "init","imported",
        "key",
        "left","local",
        "meta",
        "object",
        "param","property",
        "quasi",
        "right",
        "superClass","source",
        "tag",
        "value",
    ];
    possible_next_single.forEach(function(attr)  {
        if(acorn_node[attr]) {
            console.log(`${new_node.id} has a ${attr}`)
            addChild(acorn_node[attr], new_node)
        }
    })

    possible_next_plural = [
        "arguments",
        "body",
        "declarations",
        "expressions","elements",
        "properties",
        "quasis",
        "specifiers"
    ]
    possible_next_plural.forEach(function(attr)  {
        if(acorn_node[attr]) {
            console.log("node")
            console.log(acorn_node)
            console.log("body")
            console.log(acorn_node[attr])
            acorn_node[attr].forEach(function(c) {
                console.log(`${new_node.id} has a ${attr}`)
                addChild(c, new_node)
            })
        }
    })

    return new_node

}

exports.parse = function(text) {

    ast_array = [];

    parsed = acorn.parse(text)
    console.log(JSON.stringify(parsed,null,2))
    ast = parseNode(parsed);
}

exports.extractFromFile = function(filepath)  {
    var fs = require('fs');
    exports.parse(fs.readFileSync(filepath, 'utf8'));
    return graph.getObj()
}