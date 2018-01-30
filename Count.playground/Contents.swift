//: Playground - noun: a place where people can play

import UIKit

func mostCommonNameInList (names: [String]) -> String {
    
    var namesDictionary = [String: Int]()
    for name in names {
        if let count = namesDictionary[name] {
            namesDictionary[name] = count + 1
        } else {
            namesDictionary[name] = 1
        }
    }
    
    var commonName = ""
    for key in namesDictionary.keys {
        if commonName == "" {
            commonName = key
        } else {
            let count = namesDictionary[key]!
            if count > namesDictionary[commonName]! {
                commonName = key
            }
        }
        print("\(key) : \(namesDictionary[key]!)")
        
    }
    return commonName
    
}

print( "Most Common name in list is : \(mostCommonNameInList(names: ["Bob", "Michel", "Bob", "James", "Sam", "Johnson", "Michel", "Michel"]))")
