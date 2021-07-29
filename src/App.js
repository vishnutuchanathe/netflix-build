import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen'
import { auth } from './firebase';
import {useDispatch, useSelector} from 'react-redux';
import { selectUser, login, logout} from './features/userSlice'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      }
      else{
          dispatch(logout());
      }
    });
    console.log("user:"+user);
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="app">
    <Router>
    {console.log(user)}
    {!user? 
    (<LoginScreen />):
        (<Switch>
          <Route exacts path="/profile">
            <ProfileScreen />
          </Route>
          <Route exacts path="/">
            <HomeScreen />
          </Route>
        </Switch>)
        }
    </Router>
    </div>
  );
}

export default App;
