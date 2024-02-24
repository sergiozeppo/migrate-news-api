import './news.css';
import { NewsItem } from '../../../types/index';

class News {
  public draw(data: NewsItem[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLElement;
    news.forEach((item: NewsItem, idx: number) => {
      const newsClone = newsItemTemp as HTMLTemplateElement;
      newsClone.content.cloneNode(true) as HTMLElement;
      if (idx % 2) {
        const newsItem: Element | null = newsClone.querySelector('.news__item');
        if (newsItem) newsItem.classList.add('alt');
      }
      const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
      if (newsMetaPhoto) newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
      if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;
      const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
      if (newsMetaDate) newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      const newsDescTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
      if (newsDescTitle) newsDescTitle.textContent = item.title;
      const newsDescSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
      if (newsDescSource) newsDescSource.textContent = item.source.name;
      const newsDescCont: HTMLElement | null = newsClone.querySelector('.news__description-content');
      if (newsDescCont) newsDescCont.textContent = item.description;
      const newsReadMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');
      if (newsReadMore) newsReadMore.setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const newsClass: Element | null = document.querySelector('.news');
    if (newsClass) {
      newsClass.innerHTML = '';
      newsClass.appendChild(fragment);
    }
  }
}

export default News;
