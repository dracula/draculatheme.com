const scala = `/*
 * Once upon a time...
 */
class Vampire(location: String, birthDate: Int, deathDate: Int, weaknesses: Array[String]) {
  def age(): Int = {
    calcAge()
  }

  def calcAge(): Int = {
    this.deathDate - this.birthDate
  }

}

// ...there was a guy named Vlad
val dracula = new Vampire(location = "Transylvania", birthDate = 1428, deathDate = 1476, weaknesses = Array("Sunlight", "Garlic"))
`

export default scala;