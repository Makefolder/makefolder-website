import type { Component, JSX, Accessor, Setter } from "solid-js";
import { Show, For } from "solid-js";

import { Tag } from "./Tag";

export const Section: Component<{
  title: string;
  id: string;
  children: JSX.Element;
  sectionTags?: {
    tags: Accessor<{ name: string }[]>;
    setTags: Setter<{ name: string }[]>;
  };
}> = (props): JSX.Element => {
  return (
    <section id={props.id} class="flex flex-col gap-[2rem] sm:gap-[1rem]">
      <h4>{props.title}</h4>
      <div class="flex gap-4 flex-wrap">
        <Show when={props.sectionTags !== undefined}>
          <For
            each={
              props.sectionTags !== undefined ? props.sectionTags.tags() : []
            }
          >
            {(item, index) => {
              return (
                <div class="w-fit">
                  <Tag
                    active={true}
                    tag={item}
                    sectionTags={props.sectionTags}
                    index={index()}
                  />
                </div>
              );
            }}
          </For>
        </Show>
      </div>
      <div class="flex flex-col gap-[3rem] sm:gap-[2rem]">{props.children}</div>
    </section>
  );
};
