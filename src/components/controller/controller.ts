import { MethodCallback, typeDef } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources<SourceItem>(callback: MethodCallback<SourceItem>): void {
    super.getResp(
      {
        endpoint: 'sources' as string,
      },
      callback,
    );
  }

  public getNews<NewsAPIResponse>(e: Event, callback: MethodCallback<NewsAPIResponse>): void {
    typeDef(e.target);
    typeDef(e.currentTarget);
    let { target } = e;
    console.log(target);
    const newsContainer: EventTarget = e.currentTarget;
    console.log(newsContainer);

    while (target !== newsContainer) {
      if (target instanceof HTMLElement) {
        if (target.classList.contains('source__item')) {
          const sourceId = target.getAttribute('data-source-id') as string;
          console.log(sourceId);
          if (newsContainer instanceof HTMLElement) {
            if (newsContainer.getAttribute('data-source') !== sourceId) {
              newsContainer.setAttribute('data-source', sourceId);
              super.getResp(
                {
                  endpoint: 'everything',
                  options: {
                    sources: sourceId,
                  },
                },
                callback,
              );
            }
          }
          return;
        }
      }
      if (target instanceof HTMLElement) {
        target = target.parentNode as HTMLElement;
        console.log(target);
      }
    }
  }
}

export default AppController;
