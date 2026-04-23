import { useState } from 'react'
import './App.css'

function App() {

  const [count, setCount] = useState(0);

  function incrementCount () {
    setCount(count + 1);

    if (count === 5) {
      sendNotification();
    }

    if (count === 10) {
      sendNotification();
    }
  }

  function decrement () {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  async function sendNotification() {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;

      if (registration.active) {
        registration.active.postMessage({
          type: 'SHOW_NOTIFICATION',
          count: count,
        });
      }
    }
  }

  return(
    <div>
      <h1>Welcome to my PWA</h1>

      <p>
        I'm building this simple web app to learn about Progressive Web App concepts. It has a service worker that caches assets and a manifest file that allows it to be installed on devices. I'm excited to explore more features of PWAs and see how they can enhance the user experience!
      </p>

      <h3>Let's just add a little something to keep us busy 😉</h3>

      <button onClick={incrementCount}>Click me!</button>
      <button onClick={decrement}>Undo click</button>
      <p>You've clicked the button {count} times.</p>
      <button onClick={() => setCount(0)}>Reset</button>

      <button onClick={sendNotification}>Send Notification</button>
    </div>
  )
}

export default App;