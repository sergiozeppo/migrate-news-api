import { SourceItem } from '../../../types/index';
import './sources.css';

class Sources {
  public draw(data: SourceItem[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    if (sourceItemTemp) {
      data.forEach((item: SourceItem) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;
        const sourceItemName = sourceClone.querySelector('.source__item-name');
        if (sourceItemName) {
          sourceItemName.textContent = item.name;
        }
        const sourceItemID: Element | null = sourceClone.querySelector('.source__item');
        if (sourceItemID) {
          if (item.id) {
            sourceItemID.setAttribute('data-source-id', item.id);
          }
        }
        fragment.append(sourceClone);
      });
    }
    const sources: Element | null = document.querySelector('.sources');
    if (sources) sources.append(fragment);
  }
}

export default Sources;
