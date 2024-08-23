import type { Component, JSX } from "solid-js";
import { Show } from "solid-js";

import type { Tag as TagType } from "../types/Tag";
import cross from "../assets/cross.png";

export const Tag: Component<{ active?: boolean; tag: TagType; url: string }> = (
  props
): JSX.Element => {
  const url: string = `#${props.url}`;
  return (
    <Show
      when={!props.active}
      fallback={
        <a href={url} class="block">
          <div
            class="flex items-center gap-4
           text-[#0d0d0d] text-[1.4rem] bg-[#94DEC8] 
           px-[1rem] rounded-full border border-[#94DEC8] transition
           hover:bg-[#baf2e1]"
          >
            <div>{props.tag.name}</div>
            <div class="w-[1rem] h-[1rem] opacity-80">
              <img src={cross} alt="" class="object-contain w-full h-full" />
            </div>
          </div>
        </a>
      }
    >
      <a href={url} class="block">
        <div
          class="text-[#94DEC8] text-[1.4rem] px-[1rem] rounded-full border border-[#94DEC8]
        hover:bg-[#94DEC8] hover:text-[#0d0d0d] transition"
        >
          {props.tag.name}
        </div>
      </a>
    </Show>
  );
};
