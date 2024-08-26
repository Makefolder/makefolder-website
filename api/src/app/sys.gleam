import gleam/erlang/os
import wisp.{type Request, type Response}

pub const json_success: String = "{\"message\": \"success.\"}"

pub const method_not_allowed: String = "{\"message\": \"method not allowed.\"}"

pub const json_not_found: String = "{\"message\": \"page not found\"}"

pub fn middleware(
  req: wisp.Request,
  handle_request: fn(Request) -> Response,
) -> wisp.Response {
  let req = wisp.method_override(req)
  use <- wisp.rescue_crashes
  use req <- wisp.handle_head(req)

  let env = os.get_env("ENVIRONMENT")
  case env {
    Ok(s) -> {
      case s {
        "production" -> handle_request(req)
        _ -> {
          use <- wisp.log_request(req)
          handle_request(req)
        }
      }
    }
    Error(_) -> {
      use <- wisp.log_request(req)
      handle_request(req)
    }
  }
}
