import { RouterProvider } from 'react-router';
import './App.css';
import { router } from './router';
import { IntlProvider } from 'react-intl';
import English from './lang/en.json';
import French from './lang/fr.json';
import Footer from './components/footer/Footer';

const local = navigator.language

let lang: any;
if (local==="fr-FR") {
  lang = French;
} else  {
  lang = English;
}

function App() {
  return (
    <IntlProvider locale={local} defaultLocale='en-US' messages={lang}>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
      <Footer/>
    </IntlProvider>
  );
}

export default App;
