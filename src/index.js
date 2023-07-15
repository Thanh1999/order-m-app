import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

import { makeAuthRouting } from './routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  makeAuthRouting()
);
