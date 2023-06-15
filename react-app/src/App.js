import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentBoardsPage from "./components/CurrentBoardsPage";
import SingleBoardPage from "./components/SingleBoardPage";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoggedIn(true));
  }, [dispatch]);

  return (
    <>
      {isLoggedIn && (
        <>
          <Navigation isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/boards/current">
              <CurrentBoardsPage />
            </Route>
            <Route path="/boards/:id">
              <SingleBoardPage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
