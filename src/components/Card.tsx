import type { Accessor, Component, JSX, Setter } from "solid-js";
import { Show, For } from "solid-js";
import { Tag as TagComp } from "./Tag";

import type { Tag } from "../types/Tag";
import card from "./card.module.css";
import arrow from "../assets/arrow.png";

export const Card: Component<{
  index?: number;
  date?: string;
  title: string;
  desc: string;
  section: string;
  url?: string;
  image?: string;
  tags?: Tag[];
  sectionTags?: {
    tags: Accessor<{ name: string }[]>;
    setTags: Setter<{ name: string }[]>;
  };
  hover: boolean;
}> = (props): JSX.Element => {
  const className: string = `${props.section}-card__item`;
  const cards = document.getElementsByClassName(className);

  const shadow = () => {
    if (props.hover) {
      for (let i = 0; i < cards.length; i++) {
        if (props.index !== i) cards[i].classList.add("opacity-60");
      }
    }
  };

  const unshadow = () => {
    if (props.hover) {
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("opacity-60");
      }
    }
  };

  return (
    <div
      onMouseEnter={() => shadow()}
      onMouseLeave={() => unshadow()}
      class="transition flex justify-between"
      classList={{
        [card.style]: props.hover,
        [className]: true,
        ["p-[1.4rem]"]: props.hover,
      }}
    >
      <a
        href={props.url}
        target="_blank"
        class="hidden lg:flex justify-between flex-grow flex-shrink-0 min-w-[20rem]"
      >
        <Show
          when={props.image !== undefined && props.image !== ""}
          fallback={
            <div class="text-[#94A3B8]/90 tracking-[0.8px] font-bold uppercase">
              {props.date}
            </div>
          }
        >
          <div class="text-[#94A3B8]/90 tracking-[0.8px] font-bold uppercase w-[16rem] h-[10rem]">
            <img
              class="object-cover w-full h-full rounded-[8px]"
              src={props.image}
              alt="preview"
            />
          </div>
        </Show>
      </a>
      <div class="overflow-hidden">
        <a href={props.url} target="_blank">
          <div class="flex flex-col gap-4">
            <div class="flex items-center w-[35rem] gap-2">
              <div
                class="transition leading-tight"
                classList={{ [card.props_title]: true }}
              >
                {props.title}
              </div>
              <Show when={props.url !== undefined && props.url !== ""}>
                <div class={card.arrow} classList={{ transition: true }}>
                  <img src={arrow} alt="" />
                </div>
              </Show>
            </div>
            <div class="text-[#94A3B8]">{props.desc}</div>
          </div>
        </a>
        <Show when={props?.tags !== undefined && props?.tags.length > 0}>
          <div class="sm:ml-auto mt-[1rem]">
            <div class="flex flex-wrap gap-[1rem]">
              <For each={props?.tags}>
                {(item) => {
                  return (
                    <TagComp
                      active={false}
                      tag={item}
                      tags={props.tags}
                      url={item.name}
                      sectionTags={props.sectionTags}
                    />
                  );
                }}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};
