const kotlin = `/*
 * Once upon a time ...
 */

class Vampire(
  val location: String,
  val birthDate: Int,
  val deathDate: Int,
  val weaknesses: Array<String>
) {
  val age: Int
    get() = this.calcAge()

  fun calcAge() =
    this.deathDate - this.birthDate
}

// ... there was a guy named Vlad

fun main() {
  val Dracula = Vampire(
    "Transylvania",
    1428,
    1476,
    arrayOf("Sunlight", "Garlic")
  )
}`

export default kotlin;