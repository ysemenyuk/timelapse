console.warn('sw from public', this);

this.addEventListener('fetch', (event) => {
  console.warn('url', event.request.url);

  if (event.request.url.includes('files')) {
    const newRequest = new Request(event.request, {
      headers: { Authorization: 'Bearer XXX' },
      mode: 'cors',
    });

    event.respondWith(fetch(newRequest));
  }
});
