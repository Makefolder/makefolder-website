import type { Component, JSX } from "solid-js";

export const SocMedia: Component<{ url: string; icon: string }> = (
  props
): JSX.Element => {
  return (
    <div class="opacity-40 transition hover:opacity-100">
      <a href={props.url} target="_blank" class="block w-[3.2rem] h-[3.2rem]">
        <img src={props.icon} alt="link" class="w-full h-full object-contain" />
      </a>
    </div>
  );
};
