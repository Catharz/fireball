defmodule MazeTransformerTest do
  use ExUnit.Case

  alias MazeTransformer, as: Transformer

  test "a 1 square maze example" do
    data = [[1]]
    s = 0
    w = 331

    actual = Transformer.transform(data)

    expected = [w, s, w, w, s, w, w, w, w]

    assert actual == expected
  end

  test "a 2x2 maze example" do
    # This maze is 2 rows of 2 cells.
    # ___
    # |_  |
    # |___|
    maze = [[4, 10], [4, 9]]
    w = 331

    actual = Transformer.transform(maze)

    expected = [
      w,
      w,
      w,
      w,
      w,
      w,
      w,
      0,
      0,
      0,
      0,
      w,
      w,
      w,
      w,
      0,
      0,
      w,
      w,
      w,
      w,
      0,
      0,
      w,
      w,
      0,
      0,
      0,
      0,
      w,
      w,
      w,
      w,
      w,
      w,
      w
    ]

    assert actual == expected
  end
end
