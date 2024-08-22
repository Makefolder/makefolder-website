import type { Component, JSX } from "solid-js";
import nav from "./nav.module.css";

export const NavLink: Component<{
  title: string;
  link: string;
  selected: boolean;
  children?: JSX.Element;
}> = (props): JSX.Element => {
  const scrollToSection = (e: MouseEvent, href: string): void => {
    e.preventDefault();
    const section = document.querySelector(href);

    if (section) {
      const offset: number = -100; // Adjust based on the space you want above the section
      const sectionTop: number =
        section.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: sectionTop + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div class="font-bold text-[1.8rem] tracking-[0.8px] relative">
      <a
        onClick={(e) => {
          scrollToSection(e, props.link);
        }}
        onMouseEnter={() => {}}
        href={props.link}
        class="uppercase relative"
        classList={{ selected: props.selected, [nav.style]: !props.selected }}
      >
        {props.children}
        {props.title}
      </a>
    </div>
  );
};
