export default function serviceWorker() {
  let swUrl = `http://localhost:3000/sw.js`;

  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn('response', response);
  });
}
