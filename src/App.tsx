import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Content from './Content';
import { getOriginalConsole } from './utils';

const _c = getOriginalConsole();

let order = 0;

let preMountLogs: any[] = [];

let pre_console = {
  ..._c,
  log(...args: any[]) {
    _c.log(...args);
    preMountLogs.push({ order: order++, args, type: 'log' });
  },
  warn(...args: any[]) {
    _c.warn(...args);
    preMountLogs.push({ order: order++, args, type: 'warn' });
  },
  error(...args: any[]) {
    _c.error(...args);
    preMountLogs.push({ order: order++, args, type: 'error' });
  },
  info(...args: any[]) {
    _c.info(...args);
    preMountLogs.push({ order: order++, args, type: 'info' });
  },
};

console = pre_console;

export default function App() {
  const [state, setState] = useState<any>('');
  const [expanded, setExpanded] = useState(true);
  const [run, setRun] = useState(true);

  useEffect(() => {
    let g_console = {
      ..._c,
      log(...args: any) {
        _c.log(...args);
        run &&
          setState((state: any) => (
            <Fragment>
              {state}
              <Content type="log" args={[...args]} />
            </Fragment>
          ));
      },
      warn(...args: any) {
        _c.warn(...args);
        run &&
          setState((state: any) => (
            <Fragment>
              {state}
              <Content type="warn" args={[...args]} />
            </Fragment>
          ));
      },
      error(...args: any) {
        _c.error(...args);
        run &&
          setState((state: any) => (
            <Fragment>
              {state}
              <Content type="error" args={[...args]} />
            </Fragment>
          ));
      },
      info(...args: any) {
        _c.info(...args);
        run &&
          setState((state: any) => (
            <Fragment>
              {state}
              <Content type="info" args={[...args]} />
            </Fragment>
          ));
      },
    };

    console = g_console;

    if (preMountLogs.length === 0) {
      return;
    }

    preMountLogs.sort((a, b) => a.order - b.order);
    preMountLogs.forEach(l => {
      g_console[l.type](l.args);
    });
    preMountLogs = [];
  }, [run]);

  return (
    <div
      className="container"
      style={{
        width: expanded ? '300px' : '25px',
        maxHeight: '50vh',
        fontFamily: 'sans-serif',
        fontSize: '16px',
        overflow: 'hidden',
      }}
    >
      <div style={{ paddingLeft: 25 }}>
        <div
          style={{
            background: '#1F3B4D',
            padding: 10,
            color: 'white',
            marginLeft: 'auto',
            display: 'flex',
            height: 20,
            borderTopLeftRadius: '5px',
          }}
        >
          GUI Console
        </div>

        <div
          style={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            marginLeft: 'auto',
            maxHeight: 400,
            background: '#f0f0f0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {state}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 20,
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ height: 20, width: 25 }}
        >
          {expanded ? '>' : '<'}
        </button>
        <div style={{ width: '100%' }}>
          <button onClick={() => setRun(!run)}>{run ? 'stop' : 'play'}</button>
          <button onClick={() => setState('')}>Clear</button>
        </div>
      </div>
    </div>
  );
}
