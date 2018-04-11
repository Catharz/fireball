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
    # TODO: This id will need to be calculated for multiple players
    id = 1

    %ObjectLayer{
      draworder: "topdown",
      name: "Player",
      objects: [
        %Object{
          height: 32,
          id: id,
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

  def layer("collision", maze, args) do
    %ObjectLayer{
      color: "#ff0000",
      draworder: "topdown",
      name: "collision",
      objects: collisions_for(maze, args),
      opacity: 1,
      type: "objectgroup",
      visible: true,
      x: 0,
      y: 0
    }
  end

  def collisions_for(maze, args) do
    base_width = args.width
    room_width = args.hall_width + 1
    grid_width = base_width * room_width + 2

    # we're going to reuse the base of the walls
    # to create the collision grid
    collision_grid = layer("layer2", maze, args)

    # now we iterate through the wall bases and create
    # collisions with the appropriate x & y coordinates
    collision_grid
    |> Enum.chunk_every(grid_width)
    |> Enum.with_index(0)
    |> Enum.map(fn {row, y} ->
      row
      |> Enum.with_index(0)
      |> Enum.map(fn {col, x} ->
        case col do
          331 ->
            [
              %{
                x: ( x - 0.5 ) * 32,
                y: ( y - 0.5 ) * 32
              }
            ]
          _ ->
            []
        end
      end)
    end)
    |> List.flatten
    |> Enum.with_index(1)
    |> Enum.map(fn {coordinate, id} ->
      %{
        height: 32,
        id: id,
        name: "",
        rotation: 0,
        type: "",
        visible: true,
        width: 32,
        x: coordinate.x,
        y: coordinate.y
       }
    end)
  end

  def repeat(width, tile) do
    1..width
    |> Enum.map(fn _ -> tile end)
  end

  def transform_row(row, type, space, wall, args) do
    row
    |> Enum.map(fn room ->
      room
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

  # top section of rooms with walls hall_width + 1 in length
  # this will never match the middle or bottom of rooms
  def transform_room(room, "top", _, w, width) when room in [2, 4, 6, 8, 10, 12, 14] do
    1..(width + 1)
    |> Enum.map(fn _ -> w end)
  end

  # room sections with a wall on the left and a space equal to hall_width
  def transform_room(room, _, s, w, width) when room in [1, 2, 3, 4, 5, 6, 7] do
    right = 1..width |> Enum.map(fn _ -> s end)

    ([w] ++ right)
    |> List.flatten()
  end

  # room sections that are nothing but space
  def transform_room(room, _, s, _, width) when room in [8, 9, 10, 11, 12, 13, 14, 15] do
    1..(width + 1)
    |> Enum.map(fn _ -> s end)
  end
end
