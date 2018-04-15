defmodule Room do
  @doc """
  Provides the layout of the room as a list of strings given the width.

  ## Examples

  iex> Room.layout(1, 1)
  [
  "# #",
  "# #",
  "###"
  ]

  iex> Room.layout(2, 2)
  [
  "####",
  "#  #",
  "#  #",
  "#  #"
  ]

  iex> Room.layout(3, 1)
  [
  "# #",
  "# #",
  "# #"
  ]

  iex> Room.layout(3, 2)
  [
  "#  #",
  "#  #",
  "#  #",
  "#  #"
  ]


  iex> Room.layout(4, 1)
  [
  "###",
  "#  ",
  "###"
  ]

  iex> Room.layout(4, 2)
  [
  "####",
  "#   ",
  "#   ",
  "####"
  ]


  iex> Room.layout(5, 1)
  [
  "#  ",
  "#  ",
  "###"
  ]

  iex> Room.layout(5, 2)
  [
  "#   ",
  "#   ",
  "#   ",
  "####"
  ]

  iex> Room.layout(6, 1)
  [
  "###",
  "#  ",
  "#  "
  ]

  iex> Room.layout(6, 2)
  [
  "####",
  "#   ",
  "#   ",
  "#   "
  ]

  iex> Room.layout(7, 1)
  [
  "#  ",
  "#  ",
  "#  "
  ]

  iex> Room.layout(7, 2)
  [
  "#   ",
  "#   ",
  "#   ",
  "#   "
  ]

  iex> Room.layout(8, 1)
  [
  "###",
  "  #",
  "###"
  ]

  iex> Room.layout(8, 2)
  [
  "####",
  "   #",
  "   #",
  "####"
  ]

  iex> Room.layout(9, 1)
  [
  "  #",
  "  #",
  "###"
  ]

  iex> Room.layout(9, 2)
  [
  "   #",
  "   #",
  "   #",
  "####"
  ]

  iex> Room.layout(10, 1)
  [
  "###",
  "  #",
  "  #"
  ]

  iex> Room.layout(10, 2)
  [
  "####",
  "   #",
  "   #",
  "   #"
  ]

  iex> Room.layout(11, 1)
  [
  "  #",
  "  #",
  "  #"
  ]

  iex> Room.layout(11, 2)
  [
  "   #",
  "   #",
  "   #",
  "   #"
  ]

  iex> Room.layout(12, 1)
  [
  "###",
  "   ",
  "###"
  ]

  iex> Room.layout(12, 2)
  [
  "####",
  "    ",
  "    ",
  "####"
  ]

  iex> Room.layout(13, 1)
  [
  "   ",
  "   ",
  "###"
  ]

  iex> Room.layout(13, 2)
  [
  "    ",
  "    ",
  "    ",
  "####"
  ]

  iex> Room.layout(14, 1)
  [
  "###",
  "   ",
  "   "
  ]

  iex> Room.layout(14, 2)
  [
  "####",
  "    ",
  "    ",
  "    "
  ]

  iex> Room.layout(15, 1)
  [
  "   ",
  "   ",
  "   "
  ]

  iex> Room.layout(15, 2)
  [
  "    ",
  "    ",
  "    ",
  "    "
  ]

  """
  def layout(room, width) do
    [top_row(room, width), middle_rows(room, width), bottom_row(room, width)]
    |> List.flatten()
  end

  def print(room, width) do
    text =
      layout(room, width)
      |> Enum.map(&(&1 <> "\n"))

    IO.puts(text)
  end

  # private functions
  defp top_row(room, width) when room in [1, 3] do
    single_row("#", " ", "#", width)
  end

  defp top_row(room, width) when room in [2, 4, 6, 8, 10, 12, 14] do
    wall(width)
  end

  defp top_row(room, width) when room in [5, 7] do
    single_row("#", " ", width)
  end

  defp top_row(room, width) when room in [9, 11] do
    single_row(" ", "#", width)
  end

  defp top_row(_, width) do
    space(width)
  end

  defp middle_rows(room, width) when room in [1, 2, 3] do
    repeat_row("#", " ", "#", width)
  end

  defp middle_rows(room, width) when room in [4, 5, 6, 7] do
    repeat_row("#", " ", width)
  end

  defp middle_rows(room, width) when room in [8, 9, 10, 11] do
    repeat_row(" ", "#", width)
  end

  defp middle_rows(_, width) do
    repeat_row(" ", width)
  end

  defp bottom_row(room, width) when room in [1, 4, 5, 8, 9, 12, 13] do
    wall(width)
  end

  defp bottom_row(room, width) when room in [2, 3] do
    single_row("#", " ", "#", width)
  end

  defp bottom_row(room, width) when room in [6, 7] do
    single_row("#", " ", width)
  end

  defp bottom_row(room, width) when room in [10, 11] do
    single_row(" ", "#", width)
  end

  defp bottom_row(_, width) do
    space(width)
  end

  defp repeat_row(" ", width) do
    single_row(" ", width)
    |> List.duplicate(width)
  end

  defp repeat_row(left, right, width) do
    single_row(left, right, width)
    |> List.duplicate(width)
  end

  defp repeat_row(west, middle, east, width) do
    single_row(west, middle, east, width)
    |> List.duplicate(width)
  end

  defp wall(width), do: single_row("#", width)
  defp space(width), do: single_row(" ", width)
  defp single_row("#", " ", "#", width), do: "#" <> String.duplicate(" ", width) <> "#"
  defp single_row("#", " ", width), do: "#" <> String.duplicate(" ", width + 1)
  defp single_row(" ", "#", width), do: String.duplicate(" ", width + 1) <> "#"
  defp single_row(type, width), do: String.duplicate(type, width + 2)
end
