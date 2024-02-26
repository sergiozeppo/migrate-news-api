import { NewsItem } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  public controller: AppController;

  public view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesDoc = document.querySelector('.sources');
    if (sourcesDoc)
      sourcesDoc.addEventListener('click', (e) =>
        this.controller.getNews(e, (data: NewsItem) => this.view.drawNews(data)),
      );
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
