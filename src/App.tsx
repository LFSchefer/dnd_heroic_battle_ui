import { RouterProvider } from 'react-router';
import './App.css';
import { router } from './router';
import { IntlProvider } from 'react-intl';
import English from './lang/en.json';
import French from './lang/fr.json';

const local = navigator.language

let lang: any;
if (local==="en-EN") {
   lang = English;
} else if (local === "fr-FR") {
       lang = French;
}

function App() {
  return (
    <IntlProvider locale={local} defaultLocale='en' messages={lang}>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </IntlProvider>
  );
}

export default App;
