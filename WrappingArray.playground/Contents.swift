//: Playground - noun: a place where people can play

import UIKit

let tracks = ["a", "b", "c", "d", "e"]

func wrapArrayWithTrack (selectedTrack: String) -> [String] {
    var playList = [String]()
    var priorTracks = [String]()
    for track in tracks {
        if track == selectedTrack || playList.count > 0 {
            playList.append(track)
        } else {
            priorTracks.append(track)
        }
    }
    return playList + priorTracks
}

print(wrapArrayWithTrack(selectedTrack: "d"))

if let index = tracks.index(of: "d") {
    let prefixArray = tracks.prefix(index)
    let suffixArray = tracks.suffix(from: index)
    print(suffixArray + prefixArray)
}

