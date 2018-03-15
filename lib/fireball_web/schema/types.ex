defmodule FireballWeb.Schema.Types do
  use Absinthe.Schema.Notation
  use Timex

  @desc "A time scalar for parsing & serializing dates."
  scalar :iso_extended, description: "{ISO:Extended}" do
    parse &Timex.format(&1.value, "{ISO:Extended}")
    serialize &Timex.parse!(&1, "{ISO:Extended}")
  end
end
