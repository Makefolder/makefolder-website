import app/sys
import gleam/http
import gleam/json.{type Json}
import gleam/string_builder.{from_string}
import wisp.{
  type Request, type Response, json_response, path_segments, require_method,
}

type Info {
  Project(date: String, name: String, desc: String)
}

fn info_to_json(info_list: List(Info)) -> string_builder.StringBuilder {
  json.array(info_list, of: fn(info: Info) -> Json {
    json.object([
      #("date", json.string(info.date)),
      #("name", json.string(info.name)),
      #("description", json.string(info.desc)),
    ])
  })
  |> json.to_string_builder
}

pub fn handle_request(req: Request) -> Response {
  case path_segments(req) {
    ["api", "v1"] -> sys.middleware(req, fn(req) -> Response { index(req) })
    ["api", "v1", "projects"] ->
      sys.middleware(req, fn(req) -> Response { projects(req) })

    // default
    _ -> wisp.not_found()
  }
}

fn index(req: Request) -> Response {
  use <- require_method(req, http.Get)
  let body = from_string("{\"message\": \"Hello, Joe!\"}")
  json_response(body, 200)
}

fn projects(req: Request) -> Response {
  case req.method {
    http.Get -> {
      let projects_data: List(Info) = [
        Project("2024 – Present", "Test name", "Lorem ipsum dolor sit amet"),
        Project("2020 – 2023", "Test name #1", "Lorem ipsum dolor sit amet"),
        Project("2007 – 2010", "Test name #2", "Lorem ipsum dolor sit amet"),
      ]
      let body = info_to_json(projects_data)
      // let body = from_string("{\"message\": \"get method\"}")
      json_response(body, 200)
    }
    http.Post -> {
      let body = from_string("{\"message\": \"post method\"}")
      json_response(body, 200)
    }
    http.Put -> {
      let body = from_string("{\"message\": \"put method\"}")
      json_response(body, 200)
    }
    http.Delete -> {
      let body = from_string("{\"message\": \"delete method\"}")
      json_response(body, 200)
    }
    _ -> wisp.html_response(string_builder.new(), 405)
  }
}
