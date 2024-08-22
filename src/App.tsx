import type { Component } from "solid-js";
import { For } from "solid-js";

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
import whatsapp from "./assets/whatsapp.svg";
import banner from "./assets/banner.png";
import banner2 from "./assets/banner2.png";
import portfolio from "./assets/banner-portfolio.png";

const App: Component = () => {
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
      name: "Deployer",
      desc: `LMDB is a local movie database. Worked as fullstack developer.`,
      date: "2024",
      tags: [{ name: "Rust" }],
    },
    {
      name: "Portfolio",
      desc: `LMDB is a local movie database. Worked as fullstack developer.`,
      date: "2024",
      url: "/",
      image: portfolio,
      tags: [{ name: "Solidjs" }, { name: "TypeScript" }, { name: "Gleam" }],
    },
    {
      name: "Cnake",
      desc: `LMDB is a local movie database. Worked as fullstack developer.`,
      url: "https://github.com/tofuddreg/cnake",
      date: "2024",
      tags: [{ name: "C" }],
    },
    {
      name: "IRC-lib",
      desc: `LMDB is a local movie database. Worked as fullstack developer.`,
      url: "https://github.com/tofuddreg/irclib",
      date: "2024",
      image: banner2,
      tags: [{ name: "C" }],
    },
    {
      name: "LMDB",
      desc: `LMDB is a local movie database. Worked as fullstack developer.`,
      url: "https://github.com/tofuddreg/lmdb",
      date: "2024",
      image: banner,
      tags: [{ name: "Go" }, { name: "Svelte" }, { name: "JavaScript" }],
    },
    {
      name: "Discord bot",
      desc: `LMDB is a local movie database. Worked as fullstack developer.`,
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

  return (
    <div class="page__content lg:max-w-[1190px] mx-auto">
      <div class="main__info">
        {/* left-side */}
        <div class="main__wrapper left-0 top-0">
          <div class="main__inner">
            {/* <div class="main__container flex flex-col justify-between py-[100px] h-screen"> */}
            <div class="main__container flex flex-col justify-between py-[100px] h-[100dvh]">
              <MainSec />
              <Navbar links={links} />
              <div class="main__media flex gap-[2rem] sm:gap-[4.8rem] flex-wrap">
                <SocMedia icon={telegram} url="https://github.com/tofuddreg" />
                <SocMedia icon={whatsapp} url="https://github.com/tofuddreg" />
                <SocMedia icon={github} url="https://github.com/tofuddreg" />
                <SocMedia icon={linkedin} url="https://github.com/tofuddreg" />
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
            <Card
              hover={false}
              section="education"
              date="2024 – Present"
              title="Technical University of Košice"
              desc="I have applied to a university to study Cyber Security, 
              where I hope to further develop my skills and contribute to the field."
            />
            <Card
              hover={false}
              section="education"
              date="2020 – 2021"
              title="3D Maya Artist"
              desc="It is a long established fact that a 
              reader will be distracted by the readable 
              content of a page when looking at its layout."
            />
          </Section>

          <Section id="experience" title="Experience">
            <For each={experience}>
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
                  />
                );
              }}
            </For>
          </Section>

          <Section id="projects" title="Projects">
            <For each={projects}>
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
