defmodule MazeTest do
  use ExUnit.Case
  import ExUnit.CaptureIO
  doctest Maze

  setup do
    {:ok,
     small: [ [4,8] ],
     big: [
       [4, 10, 2],
       [2, 3, 3],
       [5, 13, 9]
     ]
    }
  end

  test "it handles single sized walls", context do
    fun = fn -> send self(),
      Maze.to_s(context[:small], %{width: 2, height: 1, hall_width: 1})
    end
    capture_io(fun)

    assert_received "\n" <>
      "#####\n" <>
      "#   #\n" <>
      "#####"
  end

  test "it handles double sized walls", context do
    fun = fn -> send self(),
      Maze.to_s(context[:small], %{width: 2, height: 1, hall_width: 2})
    end
    capture_io(fun)

    assert_received "\n" <>
      "#######\n" <>
      "#     #\n" <>
      "#     #\n" <>
      "#######"
  end

  test "it removes doubled walls", context do
    fun = fn -> send self(),
      Maze.to_s(context[:big], %{width: 3, height: 3, hall_width: 2})
    end
    capture_io(fun)

    assert_received "\n" <>
      "##########\n" <>
      "#     #  #\n" <>
      "#     #  #\n" <>
      "####  #  #\n" <>
      "#  #  #  #\n" <>
      "#  #  #  #\n" <>
      "#  #  #  #\n" <>
      "#        #\n" <>
      "#        #\n" <>
      "##########"
  end
end
