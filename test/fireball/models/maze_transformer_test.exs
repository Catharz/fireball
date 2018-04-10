defmodule MazeTransformerTest do
  use ExUnit.Case

  alias MazeTransformer, as: T

  #  _______
  # |_  |  _|
  # |  _|_  |
  # |_______|
  # [[4, 10, 6, 8], [6, 9, 5, 10], [5, 12, 12, 9]]
  #
  setup do
    {:ok, maze: [[4, 10, 6, 8], [6, 9, 5, 10], [5, 12, 12, 9]]}
  end

  test "grass for a 4x3 maze", context do
    g = 11
    assert T.layer("layer1", context[:maze]) ==
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
  end

  #  _______
  # |_  |  _|
  # |  _|_  |
  # |_______|
  # [[4, 10, 6, 8], [6, 9, 5, 10], [5, 12, 12, 9]]
  #

  test "wall bases for a 4x3 maze", context do
    b = 331

    assert T.layer("layer2", context[:maze]) ==
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, b, b, b, b, b, b, b, b, b,
        0, b, 0, 0, 0, b, 0, 0, 0, b,
        0, b, b, 0, 0, b, 0, b, b, b,
        0, b, 0, 0, 0, b, 0, 0, 0, b,
        0, b, 0, b, b, b, b, 0, 0, b,
        0, b, 0, 0, 0, 0, 0, 0, 0, b,
        0, b, b, b, b, b, b, b, b, b
      ]
  end

  #  _______
  # |_  |  _|
  # |  _|_  |
  # |_______|
  # [[4, 10, 6, 8], [6, 9, 5, 10], [5, 12, 12, 9]]
  #

  test "wall tops for a 4x3 maze", context do
    t = 321

    assert T.layer("layer3", context[:maze]) ==
      [
        t, t, t, t, t, t, t, t, t, 0,
        t, 0, 0, 0, t, 0, 0, 0, t, 0,
        t, t, 0, 0, t, 0, t, t, t, 0,
        t, 0, 0, 0, t, 0, 0, 0, t, 0,
        t, 0, t, t, t, t, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, 0, 0, t, 0,
        t, t, t, t, t, t, t, t, t, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
  end

end
