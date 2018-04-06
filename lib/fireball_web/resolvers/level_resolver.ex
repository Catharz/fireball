defmodule FireballWeb.Resolvers.LevelResolver do
  @spec generate_level(%Level{}, Absinthe.Resolution.t()) :: {atom, %Level{}}
  def generate_level(args, _info) do
    {:ok,
     %Level{
       backgroundcolor: "#00007c",
       infinite: false,
       height: args.height,
       width: args.width,
       nextobjectid: 1,
       layers: layers_for(args),
       orientation: "isometric",
       renderorder: "right-down",
       tiledversion: "1.1.3",
       tileheight: 32,
       tilewidth: 64,
       tilesets: tilesets(),
       type: "map",
       version: 1
     }}
  end

  def layers_for(args) do
    [
      tile_layer("layer1", args),
      tile_layer("layer2", args),
      player_layer(),
      tile_layer("layer3", args),
      collision_layer()
    ]
  end

  def tile_layer("layer1", args) do
    grass = 11

    %TileLayer{
      data: Enum.map(1..(args.width * args.height), fn _ -> grass end),
      height: args.height,
      name: "layer1",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: args.width,
      x: 0,
      y: 0
    }
  end

  def tile_layer("layer2", args) do
    empty = 0
    _wall_base = 331

    %TileLayer{
      data: Enum.map(1..(args.width * args.height), fn _ -> empty end),
      height: args.height,
      name: "layer2",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: args.width,
      x: 0,
      y: 0
    }
  end

  def tile_layer("layer3", args) do
    empty = 0
    _wall_base = 331

    %TileLayer{
      data: Enum.map(1..(args.width * args.height), fn _ -> empty end),
      height: args.height,
      name: "layer3",
      opacity: 1,
      type: "tilelayer",
      visible: true,
      width: args.width,
      x: 0,
      y: 0
    }
  end

  def collision_layer do
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

  def player_layer do
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

  def tilesets() do
    [
      %Tileset{firstgid: 1, source: "iso-64x64-outside.json"},
      %Tileset{firstgid: 321, source: "iso-64x64-building.json"}
    ]
  end
end
