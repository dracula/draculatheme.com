const java = `class Vampire {
    private String location;
    private int birthDate;
    private int deathDate;
    private String[] weaknesses;

    public Vampire(String location, int birthDate, int deathDate, String[] weaknesses) {
        this.location = location;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.weaknesses = weaknesses;
    }

    public int getAge() {
        return this.calcAge();
    }

    public int calcAge() {
        return this.deathDate - this.birthDate;
    }
}

// ...there was a guy named Vlad

Vampire vampire = new Vampire(
  "Transylvania",
  1428,
  1476,
  new String[] {"Sunlight", "Garlic"}
);`

export default java;

