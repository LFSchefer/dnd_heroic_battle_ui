import ReactDOM from 'react-dom/client';
import App from './App';

import { StoreProvider } from 'easy-peasy';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
);
