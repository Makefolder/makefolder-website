import { Tag } from "./Tag";

export type Project = {
  name: string;
  desc: string;
  url?: string;
  date: string;
  tags?: Tag[];
  image?: string;
};
