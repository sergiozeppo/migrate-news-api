import { ProcessEnv } from '../../types/index';
import Loader from './loader';

class AppLoader extends Loader implements ProcessEnv {
  constructor() {
    super(process.env.API_URL, {
      apiKey: process.env.API_KEY,
    });
  }

  [key: string]: string | undefined;

  public API_URL: string | undefined;

  public API_KEY: string | undefined;
}

export default AppLoader;
