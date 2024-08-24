import type { Component } from "solid-js";
import { createSignal, For, createMemo } from "solid-js";

import { MainSec } from "./components/MainSec";
import { Navbar } from "./components/Navbar";
import { SocMedia } from "./components/SocMedia";
import { Card } from "./components/Card";
import { Section } from "./components/Section";

import type { Project } from "./types/Project";
import type { Link } from "./types/Link";

import github from "./assets/github.svg";
import linkedin from "./assets/linkedin.svg";
import telegram from "./assets/telegram.svg";
import mail from "./assets/mail.svg";
import banner from "./assets/banner.png";
import banner2 from "./assets/banner2.png";
import portfolio from "./assets/banner-portfolio.png";

const App: Component = () => {
  const education: Project[] = [
    {
      date: "2024 – Present",
      name: "Technical University of Košice",
      desc: `I have applied to a university to study Cyber Security,
      where I hope to further develop my skills and contribute to the field.`,
    },
    {
      date: "2020 – 2021",
      name: "3D Maya Artist",
      desc: `I acquired the skill of creating 3D models on this course.
      I have experience of working in such programs as Maya, UE5, Rizom UV,
      Marmoset Toolbag and Substance Painter.`,
    },
  ];

  const experience: Project[] = [
    {
      name: "Olywka",
      desc: `Olywka is a commercial Ukrainian clothing online shop.
          My task in the team is backend development and server configuration.`,
      url: "https://olywka-shop.com.ua/",
      date: "2024 – Present",
      tags: [{ name: "Go" }, { name: "React" }],
    },
  ];

  const projects: Project[] = [
    {
      name: "Portfolio",
      desc: `My portfolio website.`,
      date: "2024",
      url: "/",
      image: portfolio,
      tags: [{ name: "Solidjs" }, { name: "TypeScript" }, { name: "Gleam" }],
    },
    {
      name: "Cnake",
      desc: `It's not like "Snake"! Fundamentally different concept!`,
      url: "https://github.com/tofuddreg/cnake",
      date: "2024",
      tags: [{ name: "C" }],
    },
    {
      name: "IRC-lib",
      desc: `Simple Internet Relay Chat library for C.`,
      url: "https://github.com/tofuddreg/irclib",
      date: "2024",
      image: banner2,
      tags: [{ name: "C" }],
    },
    {
      name: "LMDB",
      desc: `LMDB is a local movie database.`,
      url: "https://github.com/tofuddreg/lmdb",
      date: "2024",
      image: banner,
      tags: [{ name: "Go" }, { name: "Svelte" }, { name: "TypeScript" }],
    },
    {
      name: "Discord bot",
      desc: `Discord bot for servers written in Java.`,
      url: "https://github.com/tofuddreg/aegibot",
      date: "2023",
      tags: [{ name: "Java" }],
    },
  ];

  const links: Link[] = [
    {
      name: "About me",
      url: "#about-me",
    },
    {
      name: "Education",
      url: "#education",
    },
    {
      name: "Experience",
      url: "#experience",
    },
    {
      name: "Projects",
      url: "#projects",
      amount: projects.length,
    },
  ];

  const soc_media: Link[] = [
    {
      name: "telegram",
      url: "https://t.me/tofuddreg",
      icon: telegram,
    },
    {
      name: "github",
      url: "https://github.com/tofuddreg",
      icon: github,
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/artemii-fedotov-77809b260/",
      icon: linkedin,
    },
    {
      name: "whatsapp",
      url: "mailto:artemii.fedotov@tutamail.com",
      icon: mail,
    },
  ];

  const [tagsExperience, setTagsExperience] = createSignal(
    new Array<{ name: string }>()
  );

  const [tags, setTags] = createSignal(new Array<{ name: string }>());

  const filteredProjects = (tags: { name: string }[], cards: Project[]) => {
    return createMemo(() =>
      cards.filter((project) =>
        tags.every((tag) =>
          project.tags?.some((projectTag) => projectTag.name === tag.name)
        )
      )
    );
  };

  return (
    <div class="page__content lg:max-w-[1190px] mx-auto">
      <div class="main__info">
        {/* left-side */}
        <div class="main__wrapper left-0 top-0">
          <div class="main__inner">
            <div class="main__container flex flex-col justify-between py-[100px] h-[34rem] sm:h-[100dvh]">
              <MainSec />
              <Navbar links={links} />
              <div class="main__media flex gap-[2rem] sm:gap-[4.8rem] flex-wrap">
                <For each={soc_media}>
                  {(item) => <SocMedia icon={item.icon ?? ""} url={item.url} />}
                </For>
              </div>
            </div>
          </div>
        </div>

        {/* right-side */}
        <div class="right__resize max-w-[580px] flex flex-col flex-shrink-0 gap-[8.8rem] my-[100px]">
          <Section id="about-me" title="About me">
            <p class="text-[#94A3B8]">
              I am a self-taught programmer with a strong passion for learning
              new technologies and programming languages. I am known for my
              curiosity, problem-solving skills, and dedication to delivering
              quality work on time.
            </p>
            <p class="text-[#94A3B8]">
              I am open-minded, responsible, good in English and Slovak, fluent
              in Ukrainian and Russian.
            </p>
          </Section>

          <Section id="education" title="Education">
            <For each={education}>
              {(item) => {
                return (
                  <Card
                    hover={false}
                    section="education"
                    date={item.date}
                    title={item.name}
                    desc={item.desc}
                  />
                );
              }}
            </For>
          </Section>

          <Section
            sectionTags={{ tags: tagsExperience, setTags: setTagsExperience }}
            id="experience"
            title="Experience"
          >
            <For each={filteredProjects(tagsExperience(), experience)()}>
              {(item, index) => {
                return (
                  <Card
                    index={index()}
                    hover={true}
                    section="experience"
                    image={item.image}
                    date={item.date}
                    url={item.url}
                    desc={item.desc}
                    title={item.name}
                    tags={item.tags}
                    sectionTags={{
                      tags: tagsExperience,
                      setTags: setTagsExperience,
                    }}
                  />
                );
              }}
            </For>
          </Section>

          <Section
            sectionTags={{ tags, setTags }}
            id="projects"
            title="Projects"
          >
            <For each={filteredProjects(tags(), projects)()}>
              {(item, index) => {
                return (
                  <Card
                    index={index()}
                    hover={true}
                    section="projects"
                    image={item.image}
                    date={item.date}
                    url={item.url}
                    desc={item.desc}
                    title={item.name}
                    tags={item.tags}
                    sectionTags={{ tags, setTags }}
                  />
                );
              }}
            </For>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default App;
