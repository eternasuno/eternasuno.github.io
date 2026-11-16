import type Searcher from '@lumeland/core/searcher.ts';

declare global {
  namespace Lume {
    interface GlobalData {
      search: Searcher;
    }
  }
}
