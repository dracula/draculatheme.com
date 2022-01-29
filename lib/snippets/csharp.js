const csharp = `/*
* Once upon a time...
*/

public class Vampire {
  public string Location { get; private set; }
  public int BirthDate { get; private set; }
  public int DeathDate { get; private set; }
  public string[] Weaknesses { get; private set; }

  public Vampire(string location, int birthDate, int deathDate, string[] weaknesses) {
    Location = location;
    BirthDate = birthDate;
    DeathDate = deathDate;
    Weaknesses = weaknesses;
  }

  public int Age() {
    return calcAge();
  }

  private int calcAge() {
    return DeathDate - BirthDate;
  }
}

class Program {
  static void Main(string[] args) {
    // ...there was a guy named Vlad

    var vampire = new Vampire(
      "Transylvania",
      1428,
      1476,
      new string[] {"Sunlight", "Garlic"}
    );
  }
}`;

export default csharp;
