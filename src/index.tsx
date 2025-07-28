import ReactDOM from 'react-dom/client';
import App from './App';

import { RouterProvider } from 'react-router';
import { StoreProvider } from 'easy-peasy';
import store from './store/store';
import { router } from './router';

import { IntlProvider } from 'react-intl';
import English from './lang/en.json';
import French from './lang/fr.json';

const local = navigator.language

let lang: any;
if (local==="fr-FR") {
  lang = French;
} else  {
  lang = English;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StoreProvider store={store}>
      <IntlProvider locale={local} defaultLocale='en-US' messages={lang}>
        <RouterProvider router={router}/>
        <App />
      </IntlProvider>
    </StoreProvider>
);

