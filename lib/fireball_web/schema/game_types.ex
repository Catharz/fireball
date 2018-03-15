defmodule FireballWeb.Schema.GameTypes do
  use Absinthe.Schema.Notation

  @desc "A game."
  object :game do
    @desc "A unique id for the game."
    field :id, non_null(:id)

    @desc "The time a game started."
    field :start_time, non_null(:iso_extended)

    @desc "The time a game ended."
    field :end_time, non_null(:iso_extended)

    @desc "The list of players in this game."
    field :players, non_null(list_of(:string))

    @desc "The current (or end) score of the game."
    field :score_table, non_null(list_of(:string))
  end

  @desc "Game related queries"
  object :game_queries do
    @desc "The game score for a particular game."
    field :score, non_null(list_of(:string)) do
      @desc "The id of the game."
      arg :game_id, non_null(:id)

      resolve &FireballWeb.Resolvers.GameResolver.score/2
    end
  end
end
