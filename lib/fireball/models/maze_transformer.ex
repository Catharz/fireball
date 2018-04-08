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

  @doc """
  Transform takes the maze in the above format and totally flattens it out.
  """
  def transform(maze) do
    space = 0
    wall = 331

    maze
    |> Enum.map(fn row ->
      ["t", "m", "b"]
      |> Enum.map(fn type ->
        tile_row(row, type, space, wall)
      end)
    end)
    |> List.flatten()
  end

  defp tile_row(row, type, space, wall) do
    row
    |> Enum.map(fn room ->
      room
      |> to_walls(type, space, wall)
    end)
  end

  defp to_walls(1, "t", s, w), do: [w, s, w]
  defp to_walls(1, "m", s, w), do: [w, s, w]
  defp to_walls(1, "b", _, w), do: [w, w, w]

  defp to_walls(2, "t", _, w), do: [w, w, w]
  defp to_walls(2, "m", s, w), do: [w, s, w]
  defp to_walls(2, "b", s, w), do: [w, s, w]

  defp to_walls(3, "t", s, w), do: [w, s, w]
  defp to_walls(3, "m", s, w), do: [w, s, w]
  defp to_walls(3, "b", s, w), do: [w, s, w]

  defp to_walls(4, "t", _, w), do: [w, w, w]
  defp to_walls(4, "m", s, w), do: [w, s, s]
  defp to_walls(4, "b", _, w), do: [w, w, w]

  defp to_walls(5, "t", s, w), do: [w, s, s]
  defp to_walls(5, "m", s, w), do: [w, s, s]
  defp to_walls(5, "b", _, w), do: [w, w, w]

  defp to_walls(6, "t", _, w), do: [w, w, w]
  defp to_walls(6, "m", s, w), do: [w, s, s]
  defp to_walls(6, "b", s, w), do: [w, s, s]

  defp to_walls(7, "t", s, w), do: [w, s, s]
  defp to_walls(7, "m", s, w), do: [w, s, s]
  defp to_walls(7, "b", s, w), do: [w, s, s]

  defp to_walls(8, "t", _, w), do: [w, w, w]
  defp to_walls(8, "m", s, w), do: [s, s, w]
  defp to_walls(8, "b", s, w), do: [s, s, w]

  defp to_walls(9, "t", s, w), do: [s, s, w]
  defp to_walls(9, "m", s, w), do: [s, s, w]
  defp to_walls(9, "b", _, w), do: [w, w, w]

  defp to_walls(10, "t", _, w), do: [w, w, w]
  defp to_walls(10, "m", s, w), do: [s, s, w]
  defp to_walls(10, "b", s, w), do: [s, s, w]

  defp to_walls(11, "t", s, w), do: [s, s, w]
  defp to_walls(11, "m", s, w), do: [s, s, w]
  defp to_walls(11, "b", s, w), do: [s, s, w]

  defp to_walls(12, "t", _, w), do: [w, w, w]
  defp to_walls(12, "m", s, _), do: [s, s, s]
  defp to_walls(12, "b", _, w), do: [w, w, w]

  defp to_walls(13, "t", s, _), do: [s, s, s]
  defp to_walls(13, "m", s, _), do: [s, s, s]
  defp to_walls(13, "b", _, w), do: [w, w, w]

  defp to_walls(14, "t", _, w), do: [w, w, w]
  defp to_walls(14, "m", s, _), do: [s, s, s]
  defp to_walls(14, "b", s, _), do: [s, s, s]

  # 15 has empty walls all around it
  defp to_walls(_, _, s, _w), do: [s, s, s]
end
