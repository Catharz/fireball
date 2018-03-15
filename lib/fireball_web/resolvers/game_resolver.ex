defmodule FireballWeb.Resolvers.GameResolver do
  @spec score(%Game{}, Absinthe.Resolution.t()) :: {atom, []}
  def score(_args, _info) do
    {:ok, []}
  end
end
