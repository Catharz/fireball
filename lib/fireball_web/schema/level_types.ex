defmodule FireballWeb.Schema.LevelTypes do
  use Absinthe.Schema.Notation

  alias FireballWeb.Resolvers.LevelResolver, as: Resolver

  @desc "A level."
  object :level do
    field :backgroundcolor, non_null(:string)
    field :infinite, :boolean, default_value: false
    field :height, non_null(:integer)
    field :width, non_null(:integer)
    field :layers, non_null(list_of(:layer))
    field :nextobjectid, non_null(:integer)
    field :orientation, :string, default_value: "isometric"
    field :renderorder, :string, default_value: "right-down"
    field :tiledversion, :string, default_value: "1.1.3"
    field :tileheight, :integer, default_value: 32
    field :tilewidth, :integer, default_value: 64
    field :tilesets, non_null(list_of(:tileset))
    field :type, :string, default_value: "map"
    field :version, :integer, default_value: 1
  end

  union :layer do
    types [:tile_layer, :object_layer]

    resolve_type fn
      %TileLayer{}, _ ->
        :tile_layer

      %ObjectLayer{}, _ ->
        :object_layer

      _, _ ->
        nil
    end
  end

  object :tile_layer do
    field :data, non_null(list_of(:integer))
    field :height, non_null(:integer)
    field :name, non_null(:string)
    field :opacity, :float, default_value: 1.0
    field :type, :string, default_value: "tilelayer"
    field :visible, :boolean, default_value: true
    field :width, non_null(:integer)
    field :x, non_null(:integer)
    field :y, non_null(:integer)
  end

  object :object_layer do
    field :color, :string
    field :draworder, :string, default_value: "topdown"
    field :name, non_null(:string)
    field :objects, non_null(list_of(:object))
    field :opacity, :float, default_value: 1.0
    field :type, :string, default_value: "objectgroup"
    field :visible, :boolean, default_value: true
    field :x, non_null(:integer)
    field :y, non_null(:integer)
  end

  object :object do
    field :height, non_null(:integer)
    field :id, non_null(:integer)
    field :name, non_null(:string)
    field :rotation, non_null(:integer)
    field :type, non_null(:string)
    field :visible, non_null(:boolean)
    field :width, non_null(:integer)
    field :x, non_null(:integer)
    field :y, non_null(:integer)
  end

  object :tileset do
    field :firstgid, non_null(:integer)
    field :source, non_null(:string)
  end

  object :level_generators do
    field :generate_level, non_null(:level) do
      arg :width, non_null(:integer)
      arg :height, non_null(:integer)

      resolve &Resolver.generate_level/2
    end
  end
end
