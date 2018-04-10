defmodule MazeTransformer do
  @moduledoc """
  The mazes are created using a bitmask representing the tiles surrounding each
  wall. We need to transform that into individual tiles for our isometric levels.

  We do this by iterating through the rooms and drawing the upper wall, then
  drawing the other cells based on how wide we want the hall ways to be.

  Finally, we draw the walls at the extreme right and bottom of the maze to
  complete it.

  e.g.
  The corridor represented by the number 1 has walls to the east, south
  and west as follows:

    |   |
    |   |
    + - +
  """
  # Grass layer
  def layer("layer1", _maze, args) do
    {space, grass} = {0, 11}
    base_height = args.height
    base_width = args.width
    room_width = args.hall_width + 1

    grid_width = base_width * room_width + 2
    grid_height = base_height * room_width + 2

    [
      repeat(grid_width, space),
      1..(grid_height - 2)
      |> Enum.map(fn _ ->
        [space] ++ repeat(grid_width - 2, grass) ++ [space]
      end),
      repeat(grid_width, space)
    ]
    |> List.flatten()
  end

  # Wall bases
  def layer("layer2", maze, args) do
    {space, wall} = {0, 331}

    base_width = args.width
    room_width = args.hall_width + 1
    grid_width = base_width * room_width + 2

    [
      repeat(grid_width, space),
      maze
      |> Enum.map(fn row ->
        ["top", "mid"]
        |> Enum.map(fn type ->
          case type do
            "top" ->
              [space] ++ transform_row(row, type, space, wall, args) ++ [wall]

            _ ->
              1..args.hall_width
              |> Enum.map(fn _ ->
                [space] ++ transform_row(row, type, space, wall, args) ++ [wall]
              end)
              |> List.flatten()
          end
        end)
      end),
      [space] ++ repeat(grid_width - 1, wall)
    ]
    |> List.flatten()
  end

  # Wall tops
  def layer("layer3", maze, args) do
    {space, wall} = {0, 321}

    base_width = args.width
    room_width = args.hall_width + 1
    grid_width = base_width * room_width + 2

    [
      maze
      |> Enum.map(fn row ->
        ["top", "mid"]
        |> Enum.map(fn type ->
          case type do
            "top" ->
              transform_row(row, type, space, wall, args) ++ [wall, space]

            _ ->
              1..args.hall_width
              |> Enum.map(fn _ ->
                transform_row(row, type, space, wall, args) ++ [wall, space]
              end)
          end
        end)
      end),
      repeat(grid_width - 1, wall) ++ [space],
      repeat(grid_width, space)
    ]
    |> List.flatten()
  end

  def layer("player", _maze, _args) do
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

  def layer("collision", _maze, _args) do
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

  def transform_row(row, type, space, wall, args) do
    row
    |> Enum.map(fn room ->
      room
      # |> transform_wall(type, space, wall)
      |> transform_room(type, space, wall, args.hall_width)
    end)
    |> List.flatten()
  end

  # The room wall mappings are:
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

  def transform_room(room, "top", _, w, width) when room in [2, 4, 6, 8, 10, 12, 14] do
    1..(width + 1)
    |> Enum.map(fn _ -> w end)
  end

  def transform_room(room, _, s, w, width) when room in [1, 2, 3, 4, 5, 6, 7] do
    right = 1..width |> Enum.map(fn _ -> s end)

    ([w] ++ right)
    |> List.flatten()
  end

  def transform_room(room, _, s, _, width) when room in [8, 9, 10, 11, 12, 13, 14, 15] do
    1..(width + 1)
    |> Enum.map(fn _ -> s end)
  end
end
