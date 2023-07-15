import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { configAmplify } from './auth/Amplify';
import { OrderPage } from './pages/OrderPage';
import Button from 'react-bootstrap/Button';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    configAmplify();
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        default:
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  const renderOrderPage = () => {
    return (<>
      <div>
        <span className='me-3 fw-bold' style={{color: '#4c3306'}}>{user.signInUserSession.idToken.payload.email}</span>
        <Button variant="outline-dark" onClick={() => Auth.signOut()}>Sign Out</Button>
      </div>
      <hr />
      <OrderPage />
    </>)
  }

  return (
    <div className='m-3'>
      <div className='d-flex align-items-center justify-content-center my-3'>
        <h1>Welcome to Order Managment App</h1>
      </div>
      {user ? renderOrderPage() : (
        <Button style={{ backgroundColor: 'orange', borderColor: 'orange' }} className='text-light' onClick={() => Auth.federatedSignIn()}>Let's log in to begin</Button>
      )}
    </div>
  );
}

export default App;
