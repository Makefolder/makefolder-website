import { Component, JSX, createSignal, onCleanup, onMount } from "solid-js";
import { For, Show } from "solid-js";

import { Link } from "../types/Link";
import { NavLink } from "./NavLink";

export const Navbar: Component<{ links: Link[] }> = (props): JSX.Element => {
  const [activeLink, setActiveLink] = createSignal<string>("");

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visibleSections.length > 0) {
      const closestSection = visibleSections[0].target as HTMLElement;
      setActiveLink(`#${closestSection.id}`);
    }
  };

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport
      rootMargin: "0px",
      threshold: 0.6, // Adjust this to decide when a section is considered visible
    });

    props.links.forEach((link) => {
      const section = document.querySelector(link.url);
      if (section) observer.observe(section);
    });

    onCleanup(() => observer.disconnect());
  });

  return (
    <nav>
      <For each={props.links}>
        {(item) => (
          <Show
            when={item.amount !== undefined && item.amount > 0}
            fallback={
              <NavLink
                selected={activeLink() === item.url}
                link={item.url}
                title={item.name}
              />
            }
          >
            <NavLink
              selected={activeLink() === item.url}
              link={item.url}
              title={item.name}
            >
              <div
                class="
                  absolute -right-7 -top-1 z-10 
                  font-normal text-[0.8rem] text-[#2f2f2f]
                  leading-none px-[0.5rem] py-[0.12rem] bg-[#D0DDFF]/60 rounded-[0.8rem]"
              >
                {item?.amount}
              </div>
            </NavLink>
          </Show>
        )}
      </For>
    </nav>
  );
};
