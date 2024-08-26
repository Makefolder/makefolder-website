import app/router
import gleam/erlang/process
import gleam/io
import mist
import sqlight
import wisp
import wisp/wisp_mist

pub fn main() {
  // database connection
  let result = sqlight.open("./src/database/sqlite.db")
  case result {
    Ok(conn) -> {
      wisp.configure_logger()
      let assert Ok(_) =
        wisp_mist.handler(router.handle_request, "secret_key")
        |> mist.new
        |> mist.port(4020)
        |> mist.start_http
      process.sleep_forever()
      let res = sqlight.close(conn)
      case res {
        Ok(_) -> {
          io.println("Database connection closed.")
          io.println("Goodbye!")
        }
        Error(e) -> {
          io.debug(e)
          Nil
        }
      }
    }
    Error(e) -> {
      io.debug(e)
      io.println("Failed to open database.")
    }
  }
}
