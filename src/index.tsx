import { h, render } from 'preact';

import App from './App';
import { createRoot, getOriginalConsole } from './utils';

/** @jsx h */

export default function Console() {
  const root = createRoot();

  if (!root) {
    getOriginalConsole().error('gui-console: Error creating node');
    return;
  }

  render(<App />, root);

  return () => {
    console = getOriginalConsole();
  };
}
