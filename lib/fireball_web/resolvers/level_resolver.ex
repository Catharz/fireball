defmodule FireballWeb.Resolvers.LevelResolver do
  @spec generate_maze(%Level{}, Absinthe.Resolution.t()) :: {atom, %Level{}}
  def generate_maze(args, _info) do
    room_width = args.hall_width + 1

    {:ok,
     %Level{
       backgroundcolor: "#00007c",
       infinite: false,
       height: (args.height * room_width) + 2,
       width: (args.width * room_width) + 2,
       nextobjectid: 1,
       layers: gen_layers(args),
       orientation: "isometric",
       renderorder: "right-down",
       tiledversion: "1.1.3",
       tileheight: 32,
       tilewidth: 64,
       tilesets: tilesets(),
       type: "map",
       version: 1
     }
    }
  end

  def gen_layers(args) do
    maze = RecursiveBacktrack.run(false, args.width, args.height)
    IO.inspect maze

    ["layer1", "layer2", "player", "layer3", "collision"]
    |> Enum.map(fn layer ->
      gen_layer(layer, maze, args)
    end)
  end

  def gen_layer(layer, maze, args) when layer in ["layer1", "layer2", "layer3"] do
    data = MazeTransformer.layer(layer, maze, args)

    room_width = args.hall_width + 1
    height = (args.height * room_width) + 2
    width = (args.width * room_width) + 2

    %TileLayer{
      data: data,
      height: height,
      name: layer,
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: width,
      x: 0,
      y: 0
    }
  end

  def gen_layer(layer, maze, args) do
    layer
    |> MazeTransformer.layer(maze, args)
  end

  # These are the tilesets used to generate the graphics.
  defp tilesets() do
    [
      %Tileset{firstgid: 1, source: "iso-64x64-outside.json"},
      %Tileset{firstgid: 321, source: "iso-64x64-building.json"}
    ]
  end
end
