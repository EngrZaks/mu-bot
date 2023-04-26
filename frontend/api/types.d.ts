export interface News {
  link: string | undefined;
  title: string;
  summary?: string;
}
export interface Events extends News {
  date: string;
  time: string;
  venue: string;
}
