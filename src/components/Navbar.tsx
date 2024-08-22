import type { Component, JSX } from "solid-js";
import { For, Show } from "solid-js";

import { Link } from "../types/Link";
import { NavLink } from "./NavLink";

export const Navbar: Component<{ links: Link[] }> = (props): JSX.Element => {
  return (
    <nav>
      <For each={props.links}>
        {(item) => (
          <Show
            when={item.amount !== undefined && item.amount > 0}
            fallback={
              <NavLink selected={false} link={item.url} title={item.name} />
            }
          >
            <NavLink selected={false} link={item.url} title={item.name}>
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
