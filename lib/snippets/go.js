const go = `package main

import "fmt"

/*
  Once upon a time...
*/

type Vampire struct {
  Location   string
  BirthDate  int
  DeathDate  int
  Weaknesses []string
}

func (v *Vampire) Age() int {
  return v.calcAge()
}

func (v *Vampire) calcAge() int {
  return v.DeathDate - v.BirthDate
}

// ...there was a guy named Vlad

func main() {
  dracula := &Vampire{
    Location:   "Transylvania",
    BirthDate:  1428,
    DeathDate:  1476,
    Weaknesses: []string{"Sunlight", "Garlic"},
  }

  fmt.Println(dracula.Age())
}`

export default go
