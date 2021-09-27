const dart = `/*
 * Once upon a time...
 */

class Vampire {
  String location;
  int birthDate, deathDate;
  List<String> weaknesses;

  Vampire({this.location, this.birthDate, this.deathDate, this.weaknesses});

  int get age => this.calcAge();

  int calcAge() => this.deathDate - this.birthDate;
}

void main() {
  // ...there was a guy named Vlad
  final Dracula = Vampire(
    location: 'Transylvania',
    birthDate: 1428,
    deathDate: 1476,
    weaknesses: ['Sunlight', 'Garlic']);
}`

export default dart;