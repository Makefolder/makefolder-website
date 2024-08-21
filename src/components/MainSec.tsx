import type { Component, JSX } from "solid-js";

export const MainSec: Component = (): JSX.Element => {
  return (
    <div class="flex flex-col gap-[1rem] text-[#D0DDFF]">
      <h1 class="font-bold text-[4rem] uppercase tracking-[2px] leading-[4.8rem]">
        Artemii Fedotov
      </h1>
      <h2 class="text-[2.4rem] font-medium opacity-80">Software developer</h2>
      <p class="text-[1.8rem] text-[#94A3B8]">
        The developer you've been looking for
      </p>
    </div>
  );
};
