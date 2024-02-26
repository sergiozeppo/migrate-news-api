import { NewsAPIResponse, SourceResponse } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesDoc = document.querySelector('.sources');
    console.log(sourcesDoc);
    if (sourcesDoc)
      sourcesDoc.addEventListener('click', (e) =>
        this.controller.getNews<NewsAPIResponse>(e, (data) => {
          if (data) this.view.drawNews(data);
        }),
      );
    this.controller.getSources<SourceResponse>((data) => {
      if (data) this.view.drawSources(data);
    });
  }
}

export default App;
