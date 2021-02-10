import Console from '../dist';
import { render } from 'react-dom';
import { useEffect } from 'react';

Console();

function App() {
  useEffect(() => {
    console.log('Testing log');
    console.warn('Testing warn');
    console.error('Testing error');
    setTimeout(() => {
      console.log('log in Timeout');
      console.warn('warn in Timeout');
      console.error('error in Timeout');
    }, 5000);
  }, []);

  // useEffect(() => {
  //   let x = setInterval(() => {
  //     console.log('this is log');
  //     console.warn('this is warn');
  //     console.error('this is error');
  //   }, 5000);
  //   return () => {
  //     x && clearInterval(x);
  //   };
  // }, []);
  useEffect(() => {
    let p = { name: 'sai' };
    console.log(p);
  }, []);

  return <div>Hello</div>;
}

render(<App />, document.getElementById('root')!);
