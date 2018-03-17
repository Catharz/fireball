defmodule FireballWeb.Resolvers.GameResolver do
  @spec active_games(%Game{}, Absinthe.Resolution.t()) :: {atom, [%Game{}]}
  def active_games(_args, _info) do
    now = Timex.now()
    {:ok, start_time} = Timex.format(now, "{ISO:Extended}")

    {:ok, [ %Game{start_time: start_time, players: []} ]}
  end
end
