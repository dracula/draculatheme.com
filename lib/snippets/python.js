const python = `'''
Once upon a time...
'''

class Vampire:
  def __init__(self, traits):
    self.location = traits['location']
    self.birth_date = traits['birth_date']
    self.death_date = traits['death_date']
    self.weaknesses = traits['weaknesses']

  def get_age(self):
    return self.calc_age()

  def calc_age(self):
    return self.death_date - self.birth_date

# ...there was a guy named Vlad

Dracula = Vampire({
  'location': 'Transylvania',
  'birth_date': 1428,
  'death_date': 1476,
  'weaknesses': ['Sunlight', 'Garlic']
})`

export default python;