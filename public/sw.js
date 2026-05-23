const downloadData = new Map();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'STORE_DOWNLOAD') {
    downloadData.set(event.data.id, {
      blob: event.data.blob,
      filename: event.data.filename
    });
    event.ports[0].postMessage({ success: true });
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/__download/')) {
    const id = url.pathname.split('/')[2];
    const data = downloadData.get(id);

    if (data) {
      // Keep it in memory briefly in case of multiple requests (e.g. range requests), 
      // but typically we can delete it. We'll delete after 10 seconds.
      setTimeout(() => downloadData.delete(id), 10000);

      const headers = new Headers();
      headers.append('Content-Type', data.blob.type || 'application/octet-stream');
      headers.append('Content-Disposition', `attachment; filename="${data.filename}"`);
      headers.append('Content-Length', data.blob.size);

      const response = new Response(data.blob, { headers });
      event.respondWith(response);
    } else {
      event.respondWith(new Response('Download link expired or not found.', { status: 404 }));
    }
  }
});
