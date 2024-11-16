import { Tag } from "./Tag";

export type Project = {
  name: string;
  desc: string;
  date: string;
  certificate?: boolean;
  url?: string;
  tags?: Tag[];
  image?: string;
};
