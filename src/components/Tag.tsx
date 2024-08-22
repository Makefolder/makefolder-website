import type { Component, JSX } from "solid-js";
import type { Tag as TagType } from "../types/Tag";

export const Tag: Component<{ tag: TagType; url: string }> = (
  props
): JSX.Element => {
  const url: string = `#${props.url}`;
  return (
    <a href={url} class="block">
      <div
        class="text-[#94DEC8] text-[1.4rem] px-[1rem] rounded-full border border-[#94DEC8]
      hover:bg-[#94DEC8] hover:text-[#0d0d0d] transition"
      >
        {props.tag.name}
      </div>
    </a>
  );
};
