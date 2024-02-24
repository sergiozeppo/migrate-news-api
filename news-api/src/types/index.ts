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

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  ...classNames: string[]
): HTMLElementTagNameMap[T] => {
  const element: HTMLElementTagNameMap[T] = document.createElement(tagName);
  element.classList.add(...classNames);
  return element;
};

export interface ProcessEnv {
  [key: string]: string | undefined;
  API_URL: string | undefined;
  API_KEY: string | undefined;
}
