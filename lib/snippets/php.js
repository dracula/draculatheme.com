const php = `<?php
/*
 * Once upon a time...
 */

class Vampire
{
  public string $location;
  public int $birthDate;
  public int $deathDate;
  public array $weaknesses;

  public function __construct(array $props)
  {
    $this->location = $props['location'];
    $this->birthDate = $props['birthDate'];
    $this->deathDate = $props['deathDate'];
    $this->weaknesses = $props['weaknesses'];
  }

  public function age(): int
  {
    return $this->calcAge();
  }

  private function calcAge(): int
  {
    return $this->deathDate - $this->birthDate;
  }
}

// ...there was a guy named Vlad

$Dracula = new Vampire([
  'location' => 'Transylvania',
  'birthDate' => 1428,
  'deathDate' => 1476,
  'weaknesses' => ['Sunlight', 'Garlic']
]);`

export default php;