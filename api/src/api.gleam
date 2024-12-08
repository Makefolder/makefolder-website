import gleam/erlang/process
import gleam/string_tree
import mist
import wisp.{type Request, type Response}
import wisp/wisp_mist

pub fn main() {
  wisp.configure_logger()
  let secret_key = wisp.random_string(64)
  let assert Ok(_) =
    wisp_mist.handler(handle_request, secret_key)
    |> mist.new
    |> mist.port(4046)
    |> mist.start_http

  process.sleep_forever()
}

fn handle_request(req: Request) -> Response {
  use _ <- middleware(req)
  let body = string_tree.from_string("<h1>Hello, World!</h1>")
  wisp.html_response(body, 200)
}

fn middleware(
  req: wisp.Request,
  handle_request: fn(wisp.Request) -> wisp.Response,
) -> wisp.Response {
  // Permit browsers to simulate methods other than GET and POST using the
  // `_method` query parameter.
  let req = wisp.method_override(req)

  // Log information about the request and response.
  use <- wisp.log_request(req)

  // Return a default 500 response if the request handler crashes.
  use <- wisp.rescue_crashes

  // Rewrite HEAD requests to GET requests and return an empty body.
  use req <- wisp.handle_head(req)

  // Handle the request!
  handle_request(req)
}
