defmodule FireballWeb.Schema.GameTypes do
  use Absinthe.Schema.Notation

  @desc "A game."
  object :game do
    @desc "A unique id for the game."
    field :id, non_null(:id)

    @desc "The time a game started."
    field :start_time, non_null(:iso_extended)

    @desc "The time a game ended."
    field :end_time, :iso_extended

    @desc "The list of players in this game."
    field :players, non_null(list_of(:string))

    @desc "The current (or end) score of the game."
    field :score_table, non_null(list_of(:score))
  end

  @desc "The score a player earned during a game."
  object :score do
    @desc "The player who earned the score."
    field :player, non_null(:player)

    @desc "The number of kills earned during the game."
    field :kills, :integer, default_value: 0

    @desc "The number of times the player died during the game."
    field :deaths, :integer, default_value: 0

    @desc "The amount of money the player collected during the game."
    field :money, :integer, default_value: 0
  end

  @desc "A player in the game."
  object :player do
    @desc "The player's name."
    field :name, non_null(:string)
  end

  @desc "Game related queries"
  object :game_queries do
    @desc "The details for a particular game."
    field :active_games, non_null(list_of(:game)) do
      resolve &FireballWeb.Resolvers.GameResolver.active_games/2
    end
  end
end
