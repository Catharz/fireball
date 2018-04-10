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
    args = %{width: 4, height: 3, hall_width: 1}

    grass = T.layer("layer1", context[:maze], args)

    assert Enum.count(grass) == 80
    assert grass ==
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

  test "grass for a 4x3 x2 wide maze", context do
    g = 11
    args = %{width: 4, height: 3, hall_width: 2}

    grass = T.layer("layer1", context[:maze], args)

    assert Enum.count(grass) == 154
    assert grass ==
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, g, g, g, g, g, g, g, g, g, g, g, g, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
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
    args = %{width: 4, height: 3, hall_width: 1}

    base = T.layer("layer2", context[:maze], args)

    assert Enum.count(base) == 80
    assert base ==
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

  test "wall bases for a 4x3 x2 wide maze", context do
    b = 331
    args = %{width: 4, height: 3, hall_width: 2}

    base = T.layer("layer2", context[:maze], args)

    assert Enum.count(base) == 154
    assert base ==
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, b, b, b, b, b, b, b, b, b, b, b, b, b,
        0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b,
        0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b,
        0, b, b, b, 0, 0, 0, b, 0, 0, b, b, b, b,
        0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b,
        0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b,
        0, b, 0, 0, b, b, b, b, b, b, 0, 0, 0, b,
        0, b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b,
        0, b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b,
        0, b, b, b, b, b, b, b, b, b, b, b, b, b
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
    args = %{width: 4, height: 3, hall_width: 1}

    base = T.layer("layer3", context[:maze], args)

    assert Enum.count(base) == 80
    assert base ==
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

  test "wall tops for a 4x3 x2 wide maze", context do
    t = 321
    args = %{width: 4, height: 3, hall_width: 2}

    base = T.layer("layer3", context[:maze], args)

    assert Enum.count(base) == 154
    assert base ==
      [
        t, t, t, t, t, t, t, t, t, t, t, t, t, 0,
        t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0,
        t, t, t, 0, 0, 0, t, 0, 0, t, t, t, t, 0,
        t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, t, t, t, t, t, t, 0, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0,
        t, t, t, t, t, t, t, t, t, t, t, t, t, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
  end
end
