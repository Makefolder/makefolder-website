import app/sys
import app/types.{
  type AboutMe, type Education, type Project, AboutMe, Education, Project,
  about_me_to_json, education_to_json, project_to_json,
}
import gleam/http
import gleam/option
import gleam/string_builder.{from_string}
import wisp.{
  type Request, type Response, json_response, path_segments, require_method,
}

pub fn handle_request(req: Request) -> Response {
  case path_segments(req) {
    ["api", "v1"] -> sys.middleware(req, fn(req) -> Response { index(req) })
    ["api", "v1", "projects"] ->
      sys.middleware(req, fn(req) -> Response { projects(req) })
    ["api", "v1", "education"] ->
      sys.middleware(req, fn(req) -> Response { education(req) })
    ["api", "v1", "experience"] ->
      sys.middleware(req, fn(req) -> Response { experience(req) })
    ["api", "v1", "about-me"] ->
      sys.middleware(req, fn(req) -> Response { about_me(req) })

    // default
    _ -> json_response(string_builder.from_string(sys.json_not_found), 404)
  }
}

fn index(req: Request) -> Response {
  use <- require_method(req, http.Get)
  let body = from_string("{\"message\": \"this is index page.\"}")
  json_response(body, 200)
}

fn about_me(req: Request) -> Response {
  case req.method {
    http.Get -> {
      let data: AboutMe = AboutMe(["First paragraph", "Second paragraph"])
      let body = about_me_to_json(data)
      json_response(body, 200)
    }
    http.Post ->
      json_response(string_builder.from_string(sys.json_success), 200)
    http.Put -> json_response(string_builder.from_string(sys.json_success), 200)
    http.Delete ->
      json_response(string_builder.from_string(sys.json_success), 200)
    _ -> json_response(string_builder.from_string(sys.method_not_allowed), 405)
  }
}

fn education(req: Request) -> Response {
  case req.method {
    http.Get -> {
      let data: List(Education) = [
        types.Education(
          "2024 – Present",
          "Technical University of Košice",
          "I have applied to a university
          to study Cyber Security, where I hope
          to further develop my skills and contribute
          to the field.",
        ),
      ]
      let body = education_to_json(data)
      json_response(body, 200)
    }
    http.Post ->
      json_response(string_builder.from_string(sys.json_success), 200)
    http.Put -> json_response(string_builder.from_string(sys.json_success), 200)
    http.Delete ->
      json_response(string_builder.from_string(sys.json_success), 200)
    _ -> json_response(string_builder.from_string(sys.method_not_allowed), 405)
  }
}

fn experience(req: Request) -> Response {
  case req.method {
    http.Get -> {
      let data: List(Project) = [
        Project(
          "2024 – Present",
          "Olywka",
          "Olywka is an Ukrainian clothing shop",
          option.Some("https://olywka-shop.com.ua/"),
          ["React", "TypeScript", "Go", "SQLite3"],
        ),
      ]
      let body = project_to_json(data)
      json_response(body, 200)
    }
    http.Post ->
      json_response(string_builder.from_string(sys.json_success), 200)
    http.Put -> json_response(string_builder.from_string(sys.json_success), 200)
    http.Delete ->
      json_response(string_builder.from_string(sys.json_success), 200)
    _ -> json_response(string_builder.from_string(sys.method_not_allowed), 405)
  }
}

fn projects(req: Request) -> Response {
  case req.method {
    http.Get -> {
      let data: List(Project) = [
        Project(
          "2024",
          "Portfolio",
          "My portfolio website.",
          option.Some("https://tofuddreg.vercel.app"),
          ["Solidjs", "TypeScript", "Gleam"],
        ),
        Project(
          "2024",
          "Cnake",
          "It's not like \"Snake\"! Fundamentally different concept!",
          option.Some("https://github.com/tofuddreg/cnake"),
          ["C"],
        ),
        Project(
          "2024",
          "IRC-lib",
          "Simple Internet Relay Chat library for C.",
          option.Some("https://github.com/tofuddreg/irclib"),
          ["C"],
        ),
        Project(
          "2024",
          "LMDB",
          "The Local Movie Database",
          option.Some("https://github.com/tofuddreg/lmdb"),
          ["Go", "Svelte", "TypeScript"],
        ),
        Project(
          "2023",
          "Discord bot",
          "Bot for discord guilds written in Java.",
          option.Some("https://github.com/tofuddreg/aegibot"),
          ["Java"],
        ),
      ]
      let body = project_to_json(data)
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
    _ -> json_response(string_builder.from_string(sys.method_not_allowed), 405)
  }
}
