defmodule MazeTransformerTest do
  use ExUnit.Case

  alias MazeTransformer, as: Transformer

  test "creates a cell and its neighbours" do
    data = [[1]]
    s = 0
    w = 331

    actual = Transformer.transform(data)

    expected = [
      [w, s, w],
      [w, s, w],
      [w, w, w]
    ]

    assert actual == expected
  end
end
