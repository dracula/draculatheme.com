const elixir = `defmodule Vampire do
  @moduledoc """
  Once upon a time...
  """

  defstruct [:location, :birth_date, :death_date, :weaknesses]

  def new(props) do
    %__MODULE__{
      location: props[:location],
      birth_date: props[:birth_date],
      death_date: props[:death_date],
      weaknesses: props[:weaknesses]
    }
  end
  
  def age(vampire) do
    calc_age(vampire)
  end

  defp calc_age(vampire) do
    vampire.death_date - vampire.birth_date
  end
end

# ...there was a guy named Vlad

dracula = Vampire.new(
  location: "Transylvania",
  birthDate: 1428,
  deathDate: 1476,
  weaknesses: ["Sunlight", "Garlic"]
)
`

export default elixir
