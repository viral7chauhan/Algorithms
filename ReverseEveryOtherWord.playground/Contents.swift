//: Playground - noun: a place where people can play

import UIKit

var sampleStatement = "Hi today i trying to make reverse other word in this statement"

func reverseEveryOtherWord(statement: String) -> String {
    let allWords = statement.components(separatedBy: " ")
    var reverseStatement = ""
    
    for index in 0...allWords.count-1 {
        let word = allWords[index]
        if reverseStatement != "" {
            reverseStatement += " "
        }
        
        if index % 2 == 1 {
            let reverseWord = String(word.reversed())
            reverseStatement += reverseWord.stringByRemovingVowels()
        } else {
            reverseStatement += word.stringByRemovingVowels()
        }
        
    }
    return reverseStatement
}

extension String {
    func stringByRemovingVowels() -> String {
        var newString = self
        for vowel in ["a", "e", "i", "o", "u"] {
            newString = newString.replacingOccurrences(of: vowel, with: "")
        }
        return newString
    }
}

print(reverseEveryOtherWord(statement: sampleStatement))
