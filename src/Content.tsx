import { h } from 'preact';
import { errorStyles, infoStyles, logStyles, warnStyles } from './styles';
import JSONFormatter from 'json-formatter-js';
import 'json-formatter-js/dist//json-formatter.css';
type ContentType = 'log' | 'info' | 'warn' | 'error';

interface ContentProps {
  type: ContentType;
  args: any;
}

function isSupportedContentType(
  type: ContentType | unknown
): type is ContentType {
  return ['log', 'info', 'warn', 'error'].indexOf(type as string) > -1;
}

let matchingStyles: Record<ContentType, h.JSX.CSSProperties> = {
  log: logStyles,
  warn: warnStyles,
  info: infoStyles,
  error: errorStyles,
};

function getStyles(type: ContentType): h.JSX.CSSProperties {
  if (!isSupportedContentType(type)) {
    return {};
  }
  return matchingStyles[type];
}

// function isSingleChild(children: ComponentChildren): boolean {
//   return toChildArray(children).length === 1;
// }

// const isObject = (x: any) =>
//   Object.prototype.toString.call(x) === '[object Object]';

function getFormatter(args: any): Node {
  let v = args[0];
  if (v.length === 1) {
    return new JSONFormatter(v[0]).render() as Node;
  }
  return new JSONFormatter(v).render() as Node;
}

function Content({ type, args }: ContentProps) {
  if (!args) {
    return null;
  }

  return (
    <div
      style={getStyles(type)}
      ref={ref => ref?.appendChild(getFormatter(args))}
    ></div>
  );
}

export default Content;
