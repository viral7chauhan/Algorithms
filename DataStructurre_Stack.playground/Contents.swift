//: Playground - noun: a place where people can play

import UIKit

//Stack
class Node<T> {
    let value: T
    var next: Node?
    init(_ value: T) {
        self.value = value
    }
}

class Stack<T> {
    
    var topNode: Node<T>?
    
    func push(_ value: T){
        let oldTop = topNode
        topNode = Node(value)
        topNode?.next = oldTop
    }
    
    func pop() -> T? {
        let currentTop = topNode
        topNode = topNode?.next
        return currentTop?.value
    }
    
    func peek() -> T? {
        return topNode?.value
    }
    
}
//---------------

//Test with Int
let stack = Stack<Int>()
stack.push(4)
stack.peek()

stack.push(10)
stack.peek()

stack.push(6)
stack.peek()

stack.pop()
stack.pop()
stack.pop()

// Test with instances
struct User {
    var name: String
    var username: String
}

let userOne = User(name: "ABC", username: "@abc")
let userTwo = User(name: "XYZ", username: "@xyz")
let userThree = User(name: "PQR", username: "@pqr")

let userStack = Stack<User>()
userStack.push(userOne)
userStack.push(userTwo)
userStack.push(userThree)

userStack.pop()
userStack.pop()
userStack.pop()

//------------------------
