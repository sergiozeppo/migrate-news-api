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
  sources: NewsItemSource[];
}

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  ...classNames: string[]
): HTMLElementTagNameMap[T] => {
  const element: HTMLElementTagNameMap[T] = document.createElement(tagName);
  element.classList.add(...classNames);
  return element;
};

// type UserViewModel = Pick<User, 'name' | 'age'>;

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
