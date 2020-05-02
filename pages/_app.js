import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase/';
import useAuth from '../hooks/useAuth';

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const user = useAuth();
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
