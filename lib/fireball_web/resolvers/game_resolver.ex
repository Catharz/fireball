defmodule FireballWeb.Resolvers.GameResolver do
  @spec game(%Game{}, Absinthe.Resolution.t()) :: {atom, []}
  def game(_args, _info) do
    now = Timex.now()
    {:ok, start_time} = Timex.format(now, "{ISO:Extended}")

    {:ok, %Game{start_time: start_time, players: []}}
  end
end
