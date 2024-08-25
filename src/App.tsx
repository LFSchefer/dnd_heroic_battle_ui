import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router';
import { IntlProvider } from 'react-intl';
import English from './lang/en.json'

const local = navigator.language

function App() {
  return (
    <IntlProvider locale={local} defaultLocale='en' messages={English}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </IntlProvider>
  );
}

export default App;
