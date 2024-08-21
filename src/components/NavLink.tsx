import type { Component, JSX } from "solid-js";
import nav from "./nav.module.css";

export const NavLink: Component<{
  title: string;
  link: string;
  selected: boolean;
  children?: JSX.Element;
}> = (props): JSX.Element => {
  return (
    <div>
      <div class="font-bold text-[1.8rem] tracking-[0.8px] relative">
        <a
          href={props.link}
          class="uppercase transition relative"
          classList={{ selected: props.selected, [nav.style]: !props.selected }}
        >
          {props.children}
          {props.title}
        </a>
      </div>
    </div>
  );
};
