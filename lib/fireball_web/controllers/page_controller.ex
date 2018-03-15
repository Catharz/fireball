defmodule FireballWeb.PageController do
  use FireballWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
