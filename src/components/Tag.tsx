import type { Component, JSX, Accessor, Setter } from "solid-js";
import { Show } from "solid-js";

import type { Tag as TagType } from "../types/Tag";
import cross from "../assets/cross.png";

export const Tag: Component<{
  active: boolean;
  tag: TagType;
  sectionTags?: {
    tags: Accessor<{ name: string }[]>;
    setTags: Setter<{ name: string }[]>;
  };
  index?: number;
}> = (props): JSX.Element => {
  const setActive = (isActive: boolean): void => {
    if (props.sectionTags === undefined) return;
    if (isActive) {
      if (props.index === undefined) return;

      const tmp = props.sectionTags.tags();
      let result: { name: string }[] = [];
      if (props.index > 0) {
        result = [
          ...tmp.splice(0, props.index),
          ...tmp.splice(props.index, tmp.length),
        ];
      } else {
        result = tmp.splice(1, tmp.length);
      }

      props.sectionTags.setTags(result);
      isActive = false;
    } else {
      if (
        props.sectionTags
          .tags()
          .find((s: { name: string }) => s.name === props.tag.name) !==
        undefined
      ) {
        return;
      }
      const result = [
        ...props.sectionTags.tags(),
        ...[{ name: props.tag.name }],
      ];
      props.sectionTags.setTags(result);
      isActive = true;
    }
  };
  return (
    <Show
      when={!props.active}
      fallback={
        <button onClick={() => setActive(props.active)} class="block">
          <div
            class="flex items-center gap-4
           text-[#0d0d0d] text-[1.4rem] bg-[#94DEC8] 
           px-[1rem] py-[0.1rem] rounded-full border border-[#94DEC8] transition
           hover:bg-[#baf2e1]"
          >
            <div>{props.tag.name}</div>
            <div class="w-[1rem] h-[1rem] opacity-80">
              <img src={cross} alt="" class="object-contain w-full h-full" />
            </div>
          </div>
        </button>
      }
    >
      <button onClick={() => setActive(props.active)} class="block">
        <div
          class="text-[#94DEC8] text-[1.4rem] px-[1rem] py-[0.1rem] rounded-full border border-[#94DEC8]
        hover:bg-[#94DEC8] hover:text-[#0d0d0d] transition"
        >
          {props.tag.name}
        </div>
      </button>
    </Show>
  );
};
