(() => {
  const button = document.getElementById('begin');
  const status = document.getElementById('status');

  if (!button || !status) {
    return;
  }

  button.addEventListener('click', () => {
    status.textContent = '你向前一步。声音退后，静默开始记录你的旅程。';
  });
})();
