import type { Component, JSX } from "solid-js";
import { For } from "solid-js";

import { Tag as TagType } from "../types/Tag";
import { Tag } from "./Tag";

export const Section: Component<{
  title: string;
  id: string;
  children: JSX.Element;
}> = (props): JSX.Element => {
  // const tags: TagType[] = [{ name: "Nim" }, { name: "C++" }, { name: "C" }];
  const tags: TagType[] = [];
  return (
    <section id={props.id} class="flex flex-col gap-[2rem] sm:gap-[1rem]">
      <h4>{props.title}</h4>
      <div class="flex gap-4">
        <For each={tags}>
          {(item) => {
            return (
              <div class="w-fit">
                <Tag active={true} tag={item} url={item.name} />
              </div>
            );
          }}
        </For>
      </div>
      <div class="flex flex-col gap-[3rem] sm:gap-[2rem]">{props.children}</div>
    </section>
  );
};
