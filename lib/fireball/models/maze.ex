defmodule Maze do
  @doc """
  Creates non-overlapping tiles representing the maze.

  ## Examples

  iex> Maze.tiles([[4,8]], %{width: 2, height: 1, hall_width: 1})
  [
  %{tile: "#", x: 1, y: 1},
  %{tile: "#", x: 2, y: 1},
  %{tile: "#", x: 3, y: 1},
  %{tile: "#", x: 4, y: 1},
  %{tile: "#", x: 5, y: 1},
  %{tile: "#", x: 1, y: 2},
  %{tile: " ", x: 2, y: 2},
  %{tile: " ", x: 3, y: 2},
  %{tile: " ", x: 4, y: 2},
  %{tile: "#", x: 5, y: 2},
  %{tile: "#", x: 1, y: 3},
  %{tile: "#", x: 2, y: 3},
  %{tile: "#", x: 3, y: 3},
  %{tile: "#", x: 4, y: 3},
  %{tile: "#", x: 5, y: 3}
  ]

  iex> Maze.tiles([[4,8]], %{width: 2, height: 1, hall_width: 2})
  [
  %{tile: "#", x: 1, y: 1},
  %{tile: "#", x: 2, y: 1},
  %{tile: "#", x: 3, y: 1},
  %{tile: "#", x: 4, y: 1},
  %{tile: "#", x: 5, y: 1},
  %{tile: "#", x: 6, y: 1},
  %{tile: "#", x: 7, y: 1},
  %{tile: "#", x: 1, y: 2},
  %{tile: " ", x: 2, y: 2},
  %{tile: " ", x: 3, y: 2},
  %{tile: " ", x: 4, y: 2},
  %{tile: " ", x: 5, y: 2},
  %{tile: " ", x: 6, y: 2},
  %{tile: "#", x: 7, y: 2},
  %{tile: "#", x: 1, y: 3},
  %{tile: " ", x: 2, y: 3},
  %{tile: " ", x: 3, y: 3},
  %{tile: " ", x: 4, y: 3},
  %{tile: " ", x: 5, y: 3},
  %{tile: " ", x: 6, y: 3},
  %{tile: "#", x: 7, y: 3},
  %{tile: "#", x: 1, y: 4},
  %{tile: "#", x: 2, y: 4},
  %{tile: "#", x: 3, y: 4},
  %{tile: "#", x: 4, y: 4},
  %{tile: "#", x: 5, y: 4},
  %{tile: "#", x: 6, y: 4},
  %{tile: "#", x: 7, y: 4}
  ]

  iex> Maze.tiles([[4, 10, 2]], %{width: 3, height: 2, hall_width: 2}) |> Enum.group_by(&{&1.y})
  %{
  {1} => [
  %{tile: "#", x: 1, y: 1},
  %{tile: "#", x: 2, y: 1},
  %{tile: "#", x: 3, y: 1},
  %{tile: "#", x: 4, y: 1},
  %{tile: "#", x: 5, y: 1},
  %{tile: "#", x: 6, y: 1},
  %{tile: "#", x: 7, y: 1},
  %{tile: "#", x: 8, y: 1},
  %{tile: "#", x: 9, y: 1},
  %{tile: "#", x: 10, y: 1}
  ],
  {2} => [
  %{tile: "#", x: 1, y: 2},
  %{tile: " ", x: 2, y: 2},
  %{tile: " ", x: 3, y: 2},
  %{tile: " ", x: 4, y: 2},
  %{tile: " ", x: 5, y: 2},
  %{tile: " ", x: 6, y: 2},
  %{tile: "#", x: 7, y: 2},
  %{tile: " ", x: 8, y: 2},
  %{tile: " ", x: 9, y: 2},
  %{tile: "#", x: 10, y: 2}
  ],
  {3} => [
  %{tile: "#", x: 1, y: 3},
  %{tile: " ", x: 2, y: 3},
  %{tile: " ", x: 3, y: 3},
  %{tile: " ", x: 4, y: 3},
  %{tile: " ", x: 5, y: 3},
  %{tile: " ", x: 6, y: 3},
  %{tile: "#", x: 7, y: 3},
  %{tile: " ", x: 8, y: 3},
  %{tile: " ", x: 9, y: 3},
  %{tile: "#", x: 10, y: 3}
  ],
  {4} => [
  %{tile: "#", x: 1, y: 4},
  %{tile: "#", x: 2, y: 4},
  %{tile: "#", x: 3, y: 4},
  %{tile: "#", x: 4, y: 4},
  %{tile: " ", x: 5, y: 4},
  %{tile: " ", x: 6, y: 4},
  %{tile: "#", x: 7, y: 4},
  %{tile: " ", x: 8, y: 4},
  %{tile: " ", x: 9, y: 4},
  %{tile: "#", x: 10, y: 4}
  ]
  }
  """
  def tiles(maze, args) do
    MazeTransformer.all_rooms("layer2", maze, args)
    |> Enum.map(fn {loc, room} ->
      {loc, Room.layout(room, args.hall_width)}
    end)
    |> Enum.map(fn {loc, room_def} ->
      room_def
      |> Enum.with_index(0)
      |> Enum.map(fn {row, add_y} ->
        row
        |> String.graphemes
        |> Enum.with_index(0)
        |> Enum.map(fn {tile, add_x} ->
          %{x: loc.x + add_x, y: loc.y + add_y, tile: tile}
        end)
      end)
    end)
    |> List.flatten()
    # FIXME:
    # We resolve double walls by moving rooms up and left
    # over pre-existing walls, but this causes tiles to go
    # missing. Reverse sorting on "#" vs " ", followed by
    # removing duplicate x,y tiles fixes it.
    # There must be a bug elsewhere.
    |> Enum.sort_by(&(&1.tile))
    |> Enum.reverse
    |> Enum.uniq_by(&{&1.y, &1.x})
    |> Enum.sort_by(&{&1.y, &1.x})
  end

  def to_s(maze, args) do
    text = tiles(maze, args)
    |> Enum.map(fn tile ->
      case tile.x do
        1 ->
          "\n" <> tile.tile
        _ ->
          tile.tile
      end
    end)
    |> Enum.join()

    IO.puts text
    text
  end
end
