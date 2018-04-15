defmodule MazeTransformer do
  @moduledoc """
  The mazes are created using a bitmask representing the tiles surrounding each
  wall. We need to transform that into individual tiles for our isometric levels.

  We do this by iterating through the rooms and drawing the upper wall, then
  drawing the other cells based on how wide we want the hall ways to be.

  Finally, we draw the walls at the extreme right and bottom of the maze to
  complete it.

  The walls for each room are:
  ```
     1    2    3    4    5
    # #  ###  # #  ###  #
    # #  # #  # #  #    #
    ###  # #  # #  ###  ###

     6    7    8    9   10
    ###  #    ###    #  ###
    #    #      #    #    #
    #    #    ###  ###    #

    11   12   13   14   15
      #  ###       ###
      #
      #  ###  ###
  ```
  """

  def tile_for("layer1", x, y, width, height) when x == 1 or x == width or y == 1 or y == height,
    do: 0

  def tile_for("layer1", _, _, _, _), do: 11

  # For the grass layer we simply put a blank row at the top and left
  def layer("layer1", _maze, args) do
    grid_width = args.width * (args.hall_width + 1) + 2
    grid_height = args.height * (args.hall_width + 1) + 2

    1..grid_width
    |> Enum.map(fn x ->
      1..grid_height
      |> Enum.map(fn y ->
        tile_for("layer1", x, y, grid_width, grid_height)
      end)
    end)
    |> List.flatten()
  end

  # for wall bases we want to calculate all the walls for
  # each room, but make sure we don't double the thickness
  # of each room's walls
  def layer("layer2", maze, args) do
    {space, wall} = {0, 331}

    grid_width = args.width * (args.hall_width + 1) + 2

    [
      repeat(grid_width, space),
      Maze.tiles(maze, args)
      |> Enum.map(fn tile ->
        case tile.x do
          1 ->
            case tile.tile do
              " " ->
                [space, space]

              "#" ->
                [space, wall]
            end

          _ ->
            case tile.tile do
              " " ->
                [space]

              "#" ->
                [wall]
            end
        end
      end)
    ]
    |> List.flatten()
  end

  # Wall tops
  def layer("layer3", maze, args) do
    {space, wall} = {0, 321}

    grid_width = args.width * (args.hall_width + 1) + 2

    [
      Maze.tiles(maze, args)
      |> Enum.map(fn tile ->
        if tile.x == grid_width - 1 do
          case tile.tile do
            " " ->
              [space, space]

            "#" ->
              [wall, space]
          end
        else
          case tile.tile do
            " " ->
              [space]

            "#" ->
              [wall]
          end
        end
      end),
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
          x: 64.0,
          y: 64.0
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
      objects: collision_list(maze, args),
      opacity: 1,
      type: "objectgroup",
      visible: true,
      x: 0,
      y: 0
    }
  end

  def collision_list(maze, args) do
    # The edge collisions are 1 square shorter than the normal grid
    grid_width = args.width * (args.hall_width + 1) + 1
    grid_height = args.height * (args.hall_width + 1) + 1

    edge_and_empty_tiles = fn t ->
      t.tile == " " || t.x in [1, grid_width] || t.y in [1, grid_height]
    end

    internal_collisions = Maze.tiles(maze, args)
    |> Enum.reject(edge_and_empty_tiles)
    |> Enum.sort_by(&{&1.x, &1.y})
    |> Enum.with_index(5)
    |> Enum.map(fn {tile, id} ->
      %{
        height: 32,
        id: id,
        name: "",
        rotation: 0,
        type: "",
        visible: true,
        width: 32,
        x: tile.x * 32 - 16,
        y: tile.y * 32 - 16
      }
    end)

    [internal_collisions, edge_collisions(args)]
    |> List.flatten()
  end

  def edge_collisions(args) do
    # The edge collisions are 1 square shorter than the normal grid
    collisions_width = args.width * (args.hall_width + 1) + 1
    collisions_height = args.height * (args.hall_width + 1) + 1

    [
      %{
        height: 32,
        id: 1,
        name: "",
        rotation: 0,
        type: "",
        visible: true,
        width: collisions_width * 32,
        x: 16,
        y: 16
      },
      %{
        height: collisions_height * 32,
        id: 2,
        name: "",
        rotation: 0,
        type: "",
        visible: true,
        width: 32,
        x: 16,
        y: 16
      },
      %{
        height: 32,
        id: 3,
        name: "",
        rotation: 0,
        type: "",
        visible: true,
        width: collisions_width * 32,
        x: 16,
        y: collisions_height * 32 - 16
      },
      %{
        height: collisions_height * 32,
        id: 4,
        name: "",
        rotation: 0,
        type: "",
        visible: true,
        width: 32,
        x: collisions_width * 32 - 16,
        y: 16
      }
    ]
  end

  def repeat(width, tile) do
    1..width
    |> Enum.map(fn _ -> tile end)
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

  @doc ~S"""
  Returns the rooms with their coordinates for a maze
  of given height and width.

  Note: layer2 is the bases of each wall.

  ## Examples

  iex> MazeTransformer.all_rooms("layer2", [[6, 8], [5, 8]], %{hall_width: 2})
  [{%{x: 1, y: 1}, 6}, {%{x: 4, y: 1}, 8}, {%{x: 1, y: 4}, 5}, {%{x: 4, y: 4}, 8}]

  iex> MazeTransformer.all_rooms("layer2", [[4, 10, 2]], %{hall_width: 2})
  [{%{x: 1, y: 1}, 4}, {%{x: 4, y: 1}, 10}, {%{x: 7, y: 1}, 2}]
  """
  def all_rooms("layer2", maze, args) do
    maze
    |> Enum.with_index(1)
    |> Enum.map(fn {row, y} ->
      row
      |> Enum.with_index(1)
      |> Enum.map(fn {room, x} ->
        all_coordinates("layer2", room, args, x, y)
      end)
    end)
    |> List.flatten()
  end

  @doc """
  Get the coordinates for all rooms.

  ## Examples

  iex> MazeTransformer.all_coordinates("layer2", 2, %{width: 3, height: 2, hall_width: 2}, 2, 4)
  {%{x: 4, y: 10}, 2}
  """
  def all_coordinates("layer2", room, args, x, y) do
    {room_coordinates(x, y, args.hall_width), room}
  end

  @doc """
  Get the coordinates for a particular roomw.

  ## Examples

  iex> MazeTransformer.room_coordinates(1, 1, 2)
  %{x: 1, y: 1}

  iex> MazeTransformer.room_coordinates(1, 3, 2)
  %{x: 1, y: 7}

  iex> MazeTransformer.room_coordinates(2, 3, 2)
  %{x: 4, y: 7}
  """
  def room_coordinates(1, 1, _), do: %{x: 1, y: 1}

  def room_coordinates(1, y, 1) do
    %{x: 1, y: y * 2 - 1}
  end

  def room_coordinates(x, 1, 1) do
    %{x: x * 2 - 1, y: 1}
  end

  def room_coordinates(x, y, 1) do
    %{x: x * 2 - 1, y: y * 2 - 1}
  end

  def room_coordinates(x, y, width) do
    new_x = x * (width + 1) - 2
    new_y = y * (width + 1) - 2
    %{x: new_x, y: new_y}
  end
end
