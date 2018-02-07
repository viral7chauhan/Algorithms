//: Playground - noun: a place where people can play

import UIKit

//          10
//         /   \
//        5     14
//       /      / \
//      1      11  20

//Prepare class for structurise tree
class Node {
    let value: Int
    let leftNode: Node?
    let rightNode: Node?
    
    init(value: Int, leftNode: Node?, rightNode: Node?) {
        self.value = value
        self.leftNode = leftNode
        self.rightNode = rightNode
    }
}

//Prepare tree with Node class

//left nodes
let oneNode = Node(value: 1, leftNode: nil, rightNode: nil)
let fiveNode = Node(value: 5, leftNode: oneNode, rightNode: nil)

//Right nodes
let twentyNode = Node(value: 20, leftNode: nil, rightNode: nil)
let elevenNode = Node(value: 11, leftNode: nil, rightNode: nil)
let fourteenNode = Node(value: 14, leftNode: elevenNode, rightNode: twentyNode)

let tenRootNode = Node(value: 10, leftNode: fiveNode, rightNode: fourteenNode)


// Search element from node
func search (searchValue: Int, fromNode:Node?) -> Bool {
    if fromNode == nil {
        return false
    }
    
    if searchValue == fromNode!.value {
        return true
    } else if searchValue < fromNode!.value {
        return search(searchValue: searchValue, fromNode: fromNode?.leftNode)
    } else {
        return search(searchValue: searchValue, fromNode: fromNode?.rightNode)
    }
}

search(searchValue: 20, fromNode: tenRootNode)


