const swift = `/*
 * Once upon a time...
 */

class Vampire {
  var location: String
  var birthDate: Int
  var deathDate: Int
  var weaknesses: [String]

  init(location: String, birthDate: Int, deathDate: Int, weaknesses: [String]) {
    self.location = location
    self.birthDate = birthDate
    self.deathDate = deathDate
    self.weaknesses = weaknesses
  }

  var age: Int {
    self.calcAge()
  }

  func calcAge() -> Int {
    self.deathDate - self.birthDate
  }
}

// ...there was a guy named Vlad

let dracula = Vampire(location: "Transylvania", birthDate: 1428, deathDate: 1476, weaknesses: ["Sunlight", "Garlic"])`

export default swift
