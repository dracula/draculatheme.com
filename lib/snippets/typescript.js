const typescript = `/*
 * Once upon a time...
 */

interface VampireProps {
  location: string;
  birthDate: number;
  deathDate: number;
  weaknesses: string[];
}

class Vampire {
  location: string;
  birthDate: number;
  deathDate: number;
  weaknesses: string[];

  constructor(props: VampireProps) {
    this.location = props.location;
    this.birthDate = props.birthDate;
    this.deathDate = props.deathDate;
    this.weaknesses = props.weaknesses;
  }

  get age(): number {
    return this.calcAge();
  }

  calcAge(): number {
    return this.deathDate - this.birthDate;
  }
}

// ...there was a guy named Vlad

const Dracula: VampireProps = new Vampire({
  location: 'Transylvania',
  birthDate: 1428,
  deathDate: 1476,
  weaknesses: ['Sunlight', 'Garlic'],
});`

export default typescript
