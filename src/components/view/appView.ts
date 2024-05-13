import News from './news/news';
import Sources from './sources/sources';
import { NewsAPIResponse, SourceResponse } from '../../types/index';

export class AppView {
  public news: News;

  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: NewsAPIResponse): void {
    const values = data?.articles ? data?.articles : [];
    console.log(values);
    this.news.draw(values);
  }

  public drawSources(data: SourceResponse): void {
    const values = data?.sources ? data?.sources : [];
    if (values && this.sources) this.sources.draw(values);
  }
}

export default AppView;
