defmodule MazeTransformer do
  @moduledoc """
  The mazes are created using a bitmask representing the tiles surrounding each
  wall. We need to transform that into individual tiles for our isometric levels.

    case cell do
      1 -> [:e, :s, :w]
      2 -> [:e, :n, :w]
      3 -> [:e, :w]
      4 -> [:n, :s, :w]
      5 -> [:s, :w]
      6 -> [:n, :w]
      7 -> [:w]
      8 -> [:e, :n, :s]
      9 -> [:e, :s]
      10 -> [:e, :n]
      11 -> [:e]
      12 -> [:n, :s]
      13 -> [:s]
      14 -> [:n]
      _ -> []
    end

  The way this is done means that every cell in the maze becomes 9 tiles
  representing the corridor in the maze and the walls (or lack of) that
  suppround it.

  e.g.
  The corridor represented by the number 1 has walls to the east, south
  and west as follows:

    |   |
    |   |
    + - +

  As such, a 5x5 maze will become 15x15 tiles.
  """
  # Grass layer
  def layer("layer1", maze) do
    {space, grass} = {0, 11}
    base_height = maze |> Enum.count()
    base_width = maze |> List.first() |> Enum.count()
    room_width = 2

    grid_width = (base_width * room_width) + 2
    grid_height = (base_height * room_width) + 2

    [
      repeat(grid_width, space),
      1..(grid_height - 2)
      |> Enum.map(fn _ ->
        [space] ++ repeat(grid_width - 2, grass) ++ [space]
      end),
      repeat(grid_width, space),
    ]
    |> List.flatten()
  end

  # Wall bases
  def layer("layer2", maze) do
    {space, wall} = {0, 331}

    base_width = maze |> List.first() |> Enum.count()
    room_width = 2
    grid_width = (base_width * room_width) + 2

    [
      repeat(grid_width, space),
      maze
      |> Enum.map(fn row ->
        ["top", "mid"]
        |> Enum.map(fn type ->
          [space] ++ transform_row(row, type, space, wall) ++ [wall]
        end)
      end),
      [space] ++ repeat(grid_width - 1, wall)
    ]
    |> List.flatten()
  end

  # Wall tops
  def layer("layer3", maze) do
    {space, wall} = {0, 321}

    base_width = maze |> List.first() |> Enum.count()
    room_width = 2
    grid_width = (base_width * room_width) + 2

    [
      maze
      |> Enum.map(fn row ->
        ["top", "mid"]
        |> Enum.map(fn type ->
          transform_row(row, type, space, wall) ++ [wall, space]
        end)
      end),
      repeat(grid_width - 1, wall) ++ [space],
      repeat(grid_width, space)
    ]
    |> List.flatten()
  end

  def layer("player", _maze) do
    %ObjectLayer{
      draworder: "topdown",
      name: "Player",
      objects: [
        %Object{
          height: 32,
          id: 14,
          name: "mainPlayer",
          rotation: 0,
          type: "actor1m",
          visible: true,
          width: 32,
          x: 48.0,
          y: 48.0
        }
      ],
      opacity: 1,
      type: "objectgroup",
      visible: true,
      x: 0,
      y: 0
    }
  end

  def layer("collision", _maze) do
    %ObjectLayer{
      color: "#ff0000",
      draworder: "topdown",
      name: "collision",
      objects: [],
      opacity: 1,
      type: "objectgroup",
      visible: true,
      x: 0,
      y: 0
    }
  end

  def repeat(width, tile) do
    1..width
    |> Enum.map(fn _ -> tile end)
  end

  def transform_row(row, type, space, wall) do
    row
    |> Enum.map(fn room ->
      room
      |> transform_wall(type, space, wall)
    end)
  end

  # The wall mappings are:
  #    1    2    3    4    5
  #   # #  ###  # #  ###  #
  #   # #  # #  # #  #    #
  #   ###  # #  # #  ###  ###
  #
  #    6    7    8    9   10
  #   ###  #    ###    #  ###
  #   #    #      #    #    #
  #   #    #    ###  ###    #
  #
  #   11   12   13   14   15
  #     #  ###       ###
  #     #
  #     #  ###  ###

  def transform_wall(1, _, s, w), do: [w, s]
  def transform_wall(2, "top", _, w), do: [w, w]
  def transform_wall(2, _, s, w), do: [w, s]
  def transform_wall(3, _, s, w), do: [w, s]
  def transform_wall(4, "top", _, w), do: [w, w]
  def transform_wall(4, _, s, w), do: [w, s]
  def transform_wall(5, _, s, w), do: [w, s]
  def transform_wall(6, "top", _, w), do: [w, w]
  def transform_wall(6, _, s, w), do: [w, s]
  def transform_wall(7, _, s, w), do: [w, s]
  def transform_wall(8, "top", _, w), do: [w, w]
  def transform_wall(8, _, s, _), do: [s, s]
  def transform_wall(9, _, s, _), do: [s, s]
  def transform_wall(10, "top", _, w), do: [w, w]
  def transform_wall(10, _, s, _), do: [s, s]
  def transform_wall(11, _, s, _), do: [s, s]
  def transform_wall(12, "top", _, w), do: [w, w]
  def transform_wall(12, _, s, _), do: [s, s]
  def transform_wall(13, _, s, _), do: [s, s]
  def transform_wall(14, "top", _, w), do: [w, w]
  def transform_wall(14, _, s, _), do: [s, s]
  def transform_wall(_, _, s, _w), do: [s, s]
end
