import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainComponent from './components/main/Main';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { StyledEngineProvider } from '@mui/material/styles';
import '@aws-amplify/ui-react/styles.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


Amplify.configure(config);


function App({ signOut, user }) {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <MainComponent user={user} signOut={signOut} />
      </StyledEngineProvider>
    </>
  );
}

let AppWithAuth = withAuthenticator(App);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWithAuth/>);
