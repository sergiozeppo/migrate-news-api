import { NewsItemSource } from '../../../types/index';
import './sources.css';

class Sources {
  public draw(data: NewsItemSource[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: Element | null = document.querySelector('#sourceItemTemp');

    data.forEach((item: NewsItemSource) => {
      const sourceClone = sourceItemTemp as HTMLTemplateElement;
      sourceClone.content.cloneNode(true) as HTMLElement;

      const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
      if (sourceItemName) sourceItemName.textContent = item.name;
      const sourceItemID: HTMLElement | null = sourceClone.querySelector('.source__item');
      if (sourceItemID) {
        if (item.id) sourceItemID.setAttribute('data-source-id', item.id);
      }
      fragment.append(sourceClone);
    });

    const sources: HTMLElement | null = document.querySelector('.sources');
    if (sources) sources.append(fragment);
  }
}

export default Sources;
