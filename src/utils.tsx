export const createRoot = () => {
  if (!document.getElementById('__g_console')) {
    let el = document.createElement('div');
    el.id = '__g_console';
    el.className = '__g_console';
    el.style.position = `fixed`;
    el.style.right = `0px`;
    el.style.bottom = `0px`;
    el.style.zIndex = `2`;
    document.body.appendChild(el);
  }
  return document.getElementById('__g_console');
};

const console_backup = console;

export const getOriginalConsole = () => {
  return console_backup;
};
