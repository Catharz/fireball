defmodule MazeTransformer do
  @moduledoc """
  The mazes are created using a bitmask representing the tiles surrounding each
  wall. We need to transform that into tiles for our isometric levels.

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
  """

  def transform(maze) do
    space = 0
    wall = 331
    maze
    |> Enum.map(fn row ->
      row
      |> Enum.map(fn cell ->
        cell
        |> to_walls(space, wall)
      end)
    end)
    |> Enum.flat_map(fn [ tile ] -> tile end)
  end

  defp to_walls(1, s, w) do
    [
      [w, s, w],
      [w, s, w],
      [w, w, w]
    ]
  end

  defp to_walls(2, s, w) do
    [
      [w, w, w],
      [w, s, w],
      [w, s, w]
    ]
  end

  defp to_walls(3, s, w) do
    [
      [w, s, w],
      [w, s, w],
      [w, s, w]
    ]
  end

  defp to_walls(4, s, w) do
    [
      [w, w, w],
      [w, s, s],
      [w, w, w]
    ]
  end

  defp to_walls(5, s, w) do
    [
      [w, s, s],
      [w, s, s],
      [w, w, w]
    ]
  end

  defp to_walls(6, s, w) do
    [
      [w, w, w],
      [w, s, s],
      [w, s, s]
    ]
  end

  defp to_walls(7, s, w) do
    [
      [w, s, s],
      [w, s, s],
      [w, s, s]
    ]
  end

  defp to_walls(8, s, w) do
    [
      [w, w, w],
      [s, s, w],
      [s, s, w]
    ]
  end

  defp to_walls(9, s, w) do
    [
      [s, s, w],
      [s, s, w],
      [w, w, w]
    ]
  end

  defp to_walls(10, s, w) do
    [
      [w, w, w],
      [s, s, w],
      [s, s, w]
    ]
  end

  defp to_walls(11, s, w) do
    [
      [s, s, w],
      [s, s, w],
      [s, s, w]
    ]
  end

  defp to_walls(12, s, w) do
    [
      [w, w, w],
      [s, s, s],
      [w, w, w]
    ]
  end

  defp to_walls(13, s, w) do
    [
      [s, s, s],
      [s, s, s],
      [w, w, w]
    ]
  end

  defp to_walls(14, s, w) do
    [
      [w, w, w],
      [s, s, s],
      [s, s, s]
    ]
  end

  defp to_walls(15, s, _w) do
    [
      [s, s, s],
      [s, s, s],
      [s, s, s]
    ]
  end
end
