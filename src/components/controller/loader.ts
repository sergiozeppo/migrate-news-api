import { MethodCallback } from '../../types/index';

class Loader {
  private baseLink: string | undefined;

  private options: Record<string, string>;

  constructor(baseLink: string | undefined, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
    callback = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load<string>('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  private makeUrl(options: Record<string, string>, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((index) => {
      url += `${index}=${urlOptions[index]}&`;
    });
    return url.slice(0, -1);
  }

  private load<NewsItem>(method: string, endpoint: string, callback: MethodCallback<NewsItem>, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: NewsItem) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
