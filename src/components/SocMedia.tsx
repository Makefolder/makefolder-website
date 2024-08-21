import type { Component, JSX } from "solid-js";

export const SocMedia: Component<{ url: string; icon: string }> = (
  props
): JSX.Element => {
  return (
    <div class="opacity-40 transition hover:opacity-100">
      <a href={props.url} target="_blank">
        <img src={props.icon} alt="link" />
      </a>
    </div>
  );
};
