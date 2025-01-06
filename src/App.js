import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './App.css';
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHfEFLNiE_E7GavMzHkakWUVjnzYNLxCA",
  authDomain: "auth-b8aa4.firebaseapp.com",
  projectId: "auth-b8aa4",
  storageBucket: "auth-b8aa4.firebasestorage.app",
  messagingSenderId: "644520658514",
  appId: "1:644520658514:web:c4dab4390619b60cf3c18b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(person => {
      if (person) {
        setUser(person);
      } else {
        setUser(null);
        console.log('User signed out');
      }
    })
  }, [])
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (

    <>
      <div>
        <center>
          {user ? (<div>
            <h1>Welcome to Home Page </h1>
            <button onClick={() =>auth.signOut()} className='signout-btn'>Sign Out <FiLogOut size={21} style={{ marginLeft: '3px' }} /></button>
          </div>) : (<div className="App">
            <button onClick={signInWithGoogle} className='google-signin-btn'>
            Sign in with Google <FcGoogle size={21} style={{ marginLeft: '2px' }}/></button>
          </div>)}
        </center>
      </div>
    </>
  );
}

export default App;
