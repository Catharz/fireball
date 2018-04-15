defmodule MazeTransformerTest do
  use ExUnit.Case, async: true
  doctest MazeTransformer

  alias MazeTransformer, as: T

  #  _______
  # |_  |  _|
  # |  _|_  |
  # |_______|
  # [[4, 10, 6, 8], [6, 9, 5, 10], [5, 12, 12, 9]]
  #
  # creates a grass area like
  #
  #  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  #  0, g, g, g, g, g, g, g, g, 0,
  #  0, g, g, g, g, g, g, g, g, 0,
  #  0, g, g, g, g, g, g, g, g, 0,
  #  0, g, g, g, g, g, g, g, g, 0,
  #  0, g, g, g, g, g, g, g, g, 0,
  #  0, g, g, g, g, g, g, g, g, 0,
  #  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  #
  setup do
    {
      :ok,
      maze: [
        [4, 10, 6, 8],
        [6, 9, 5, 10],
        [5, 12, 12, 9]
      ],
      small: %{width: 4, height: 3, hall_width: 1},
      big: %{width: 4, height: 3, hall_width: 2}
    }
  end

  test "room coordinates for all rooms", context do
    small_rooms = T.all_rooms("layer2", context[:maze], context[:small])
    big_rooms = T.all_rooms("layer2", context[:maze], context[:big])

    assert {%{x: 1, y: 1}, 4} in small_rooms
    assert {%{x: 3, y: 5}, 12} in small_rooms
    assert {%{x: 7, y: 5}, 9} in small_rooms

    assert {%{x: 1, y: 1}, 4} in big_rooms
    assert {%{x: 4, y: 7}, 12} in big_rooms
    assert {%{x: 1, y: 7}, 5} in big_rooms
  end

  test "room coordinates for top row", context do
    assert T.room_coordinates(1, 1, context[:small].hall_width) == %{x: 1, y: 1}
    assert T.room_coordinates(2, 1, context[:small].hall_width) == %{x: 3, y: 1}
    assert T.room_coordinates(3, 1, context[:small].hall_width) == %{x: 5, y: 1}

    assert T.room_coordinates(1, 1, context[:big].hall_width) == %{x: 1, y: 1}
    assert T.room_coordinates(2, 1, context[:big].hall_width) == %{x: 4, y: 1}
    assert T.room_coordinates(3, 1, context[:big].hall_width) == %{x: 7, y: 1}
  end

  test "room coordinates for left column", context do
    assert T.room_coordinates(1, 1, context[:small].hall_width) == %{x: 1, y: 1}
    assert T.room_coordinates(1, 2, context[:small].hall_width) == %{x: 1, y: 3}
    assert T.room_coordinates(1, 3, context[:small].hall_width) == %{x: 1, y: 5}

    assert T.room_coordinates(1, 1, context[:big].hall_width) == %{x: 1, y: 1}
    assert T.room_coordinates(1, 2, context[:big].hall_width) == %{x: 1, y: 4}
    assert T.room_coordinates(1, 3, context[:big].hall_width) == %{x: 1, y: 7}
  end

  test "room coordinates for other rooms", context do
    assert T.room_coordinates(2, 2, context[:small].hall_width) == %{x: 3, y: 3}
    assert T.room_coordinates(2, 2, context[:big].hall_width) == %{x: 4, y: 4}
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
        0, b, b, b, 0, b, 0, b, b, b,
        0, b, 0, 0, 0, b, 0, 0, 0, b,
        0, b, 0, b, b, b, b, b, 0, b,
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
        0, b, b, b, b, 0, 0, b, 0, 0, b, b, b, b,
        0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b,
        0, b, 0, 0, 0, 0, 0, b, 0, 0, 0, 0, 0, b,
        0, b, 0, 0, b, b, b, b, b, b, b, 0, 0, b,
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
        t, t, t, 0, t, 0, t, t, t, 0,
        t, 0, 0, 0, t, 0, 0, 0, t, 0,
        t, 0, t, t, t, t, t, 0, t, 0,
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
        t, t, t, t, 0, 0, t, 0, 0, t, t, t, t, 0,
        t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, t, t, t, t, t, t, t, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0,
        t, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0,
        t, t, t, t, t, t, t, t, t, t, t, t, t, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
  end
end
