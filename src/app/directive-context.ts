import { ScrollingStrategy } from './models/scrolling-strategy.model';

export abstract class DirectiveContext {

  protected scrollingStrategy: ScrollingStrategy;

  constructor() { }
}
