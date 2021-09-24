const ruby = `#
# Once upon a time...
#

class Vampire
  def initialize(opts)
    @location = opts[:location]
    @birthDate = opts[:birthDate]
    @deathDate = opts[:deathDate]
    @weaknesses = opts[:weaknesses]
  end

  def age
    calcAge
  end

  private

  def calcAge
    @deathDate - @birthDate
  end
end

# ...there was a guy named Vlad

dracula = Vampire.new(
  location: 'Transylvania',
  birthDate: 1428,
  deathDate: 1476,
  weaknesses: %w[Sunlight Garlic]
)

puts dracula.age`

export default ruby;