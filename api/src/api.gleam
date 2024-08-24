import app/router
import gleam/erlang/process
import mist
import wisp
import wisp/wisp_mist

pub fn main() {
  wisp.configure_logger()
  let assert Ok(_) =
    wisp_mist.handler(router.handle_request, "")
    |> mist.new
    |> mist.port(4020)
    |> mist.start_http
  process.sleep_forever()
}
