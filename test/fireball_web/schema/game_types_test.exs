defmodule FireballWeb.Schema.GameTypesTest do
  use ExUnit.Case
  use Absinthe.Schema.Notation

  setup do
    {:ok,
     query: Absinthe.Schema.lookup_type(FireballWeb.Schema, "GameQueries"),
     response: Absinthe.Schema.lookup_type(FireballWeb.Schema, "Game")}
  end

  test "ActiveGames returns a list of games", context do
    resp = context[:query].fields.active_games

    assert resp.type == non_null(list_of(:game))
  end

  test "ActiveGames takes no parameters.", context do
    args = context[:query].fields.active_games.args

    assert args == %{}
  end

  test "ActiveGames returns these fields.", context do
    fields = context[:response].fields

    assert fields.id.type == non_null(:id)
    assert fields.start_time.type == non_null(:iso_extended)
    assert fields.end_time.type == :iso_extended
    assert fields.players.type == non_null(list_of(:string))
    assert fields.score_table.type == non_null(list_of(:score))
  end

  test "A Score has these fields" do
    score = Absinthe.Schema.lookup_type(FireballWeb.Schema, "Score").fields

    assert score.player.type == non_null(:player)
    assert score.kills.type == :integer
    assert score.kills.default_value == 0
    assert score.deaths.type == :integer
    assert score.deaths.default_value == 0
    assert score.money.type == :integer
    assert score.money.default_value == 0
  end

  test "A player has these fields" do
    player = Absinthe.Schema.lookup_type(FireballWeb.Schema, "Player").fields

    assert player.name.type == non_null(:string)
  end
end
