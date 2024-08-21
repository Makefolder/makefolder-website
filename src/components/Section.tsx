import type { Component, JSX } from "solid-js";

export const Section: Component<{
  title: string;
  id: string;
  children: JSX.Element;
}> = (props): JSX.Element => {
  return (
    <section id={props.id} class="flex flex-col gap-[1rem]">
      <h4>{props.title}</h4>
      <div class="flex flex-col gap-[2rem]">{props.children}</div>
    </section>
  );
};
