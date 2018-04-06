defmodule FireballWeb.Router do
  use FireballWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  # pipeline :api do
  #   plug :accepts, ["json"]
  # end

  # Other scopes may use custom stacks.
  # scope "/api", FireballWeb do
  #   pipe_through :api
  # end

  pipeline :graphql do
    plug(:accepts, ["json"])
  end

  scope "/graphql" do
    pipe_through(:graphql)

    forward("/", Absinthe.Plug, schema: FireballWeb.Schema)
  end

  forward(
    "/graphiql",
    Absinthe.Plug.GraphiQL,
    schema: FireballWeb.Schema,
    interface: :playground
  )

  scope "/", FireballWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
  end
end
