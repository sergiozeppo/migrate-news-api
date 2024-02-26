import { MethodCallback, typeDef } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources<T>(callback: MethodCallback<T>): void {
    super.getResp(
      {
        endpoint: 'sources' as string,
      },
      callback,
    );
  }

  public getNews<T>(e: Event, callback: MethodCallback<T>): void {
    typeDef(e.target);
    typeDef(e.currentTarget);
    let { target } = e;
    const newsContainer: EventTarget = e.currentTarget;

    while (target !== newsContainer) {
      if (target instanceof HTMLElement) {
        if (target.classList.contains('source__item')) {
          const sourceId = target.getAttribute('data-source-id');
          if (newsContainer instanceof HTMLElement) {
            if (newsContainer.getAttribute('data-source') !== sourceId) {
              newsContainer.setAttribute('data-source', sourceId as string);
              super.getResp(
                {
                  endpoint: 'everything',
                  options: {
                    sources: sourceId as string,
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
      }
    }
  }
}

export default AppController;
