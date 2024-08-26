import gleam/json.{type Json}
import gleam/option.{type Option}
import gleam/string_builder.{type StringBuilder}

pub type Project {
  Project(
    date: String,
    name: String,
    desc: String,
    url: Option(String),
    tags: List(String),
  )
}

pub type Education {
  Education(date: String, name: String, desc: String)
}

pub type AboutMe {
  AboutMe(paragraphs: List(String))
}

pub fn about_me_to_json(data: AboutMe) -> StringBuilder {
  json.object([
    #(
      "paragraphs",
      json.array(data.paragraphs, fn(paragraph: String) -> Json {
        json.string(paragraph)
      }),
    ),
  ])
  |> json.to_string_builder
}

pub fn education_to_json(data_list: List(Education)) -> StringBuilder {
  json.array(data_list, fn(data: Education) -> Json {
    json.object([
      #("date", json.string(data.date)),
      #("name", json.string(data.name)),
      #("description", json.string(data.desc)),
    ])
  })
  |> json.to_string_builder
}

pub fn project_to_json(data_list: List(Project)) -> StringBuilder {
  json.array(data_list, fn(data: Project) -> Json {
    json.object([
      #("date", json.string(data.date)),
      #("name", json.string(data.name)),
      #("description", json.string(data.desc)),
      #(
        "url",
        json.nullable(data.url, fn(url: String) -> Json { json.string(url) }),
      ),
      #(
        "tags",
        json.array(data.tags, fn(tag: String) -> Json {
          json.object([#("tag", json.string(tag))])
        }),
      ),
    ])
  })
  |> json.to_string_builder
}
