defmodule FireballWeb.Schema do
  use Absinthe.Schema

  import_types FireballWeb.Schema.Types
  import_types __MODULE__.GameTypes

  query do
    import_fields :game_queries
  end
end
