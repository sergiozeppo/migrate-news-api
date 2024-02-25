import News from './news/news';
import Sources from './sources/sources';
import { NewsItem, NewsAPIResponse } from '../../types/index';

export class AppView implements AppView {
  public news: News;

  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: Partial<NewsItem & NewsAPIResponse>): void {
    const values = data?.articles ? data?.articles : [];
    if (values && this.news) this.news.draw(values);
  }

  public drawSources(data: Partial<NewsItem & NewsAPIResponse>): void {
    const values = data?.sources ? data?.sources : [];
    if (values && this.sources) this.sources.draw(values);
  }
}

export default AppView;
