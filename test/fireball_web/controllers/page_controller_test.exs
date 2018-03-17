defmodule FireballWeb.PageControllerTest do
  use FireballWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Welcome to Fireball!"
  end
end
