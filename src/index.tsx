import { h, render } from 'preact';
import invariant from 'tiny-invariant';
import App from './App';
import { createRoot, getOriginalConsole } from './utils';

/** @jsx h */

export default function Console() {
  const root = createRoot();

  invariant(root !== null, 'gui-console: Failed to create a root element');

  render(<App />, root);

  return () => {
    console = getOriginalConsole();
  };
}
