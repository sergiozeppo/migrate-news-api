export interface NewsItemSource {
  id: string | null;
  name: string;
}

export interface NewsItem {
  source: NewsItemSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsAPIResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsItem[];
}

type Categories = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

enum Languages {
  ar,
  de,
  en,
  es,
  fr,
  he,
  it,
  nl,
  no,
  pt,
  ru,
  sv,
  ud,
  zh,
}

enum Countries {
  ae,
  ar,
  at,
  au,
  be,
  bg,
  br,
  ca,
  ch,
  cn,
  co,
  cu,
  cz,
  de,
  eg,
  fr,
  gb,
  gr,
  hk,
  hu,
  id,
  ie,
  il,
  in,
  it,
  jp,
  kr,
  lt,
  lv,
  ma,
  mx,
  my,
  ng,
  nl,
  no,
  nz,
  ph,
  pl,
  pt,
  ro,
  rs,
  ru,
  sa,
  se,
  sg,
  si,
  sk,
  th,
  tr,
  tw,
  ua,
  us,
  ve,
  za,
}

export interface SourceItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Categories;
  language: Languages;
  country: Countries;
}

export interface SourceResponse {
  status: 'ok' | 'error';
  sources: SourceItem[];
}

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  ...classNames: string[]
): HTMLElementTagNameMap[T] => {
  const element: HTMLElementTagNameMap[T] = document.createElement(tagName);
  element.classList.add(...classNames);
  return element;
};

export type MethodCallback<T> = (data?: T) => void;

export function typeDef<T>(value: T): asserts value is NonNullable<T> {
  if (!value) throw new Error(`${value} is not defined`);
}

export enum StatusResp {
  'ok' = 'ok',
  'error' = 'error',
}

export interface ResponseAPI {
  status: StatusResp;
  code: string;
  message: string;
}
