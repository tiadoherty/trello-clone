import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CurrentBoardsPage from "./components/CurrentBoardsPage";
import SingleBoardPage from "./components/SingleBoardPage";
import AddMemberPage from "./components/AddMemberPage";
import PublicLandingPage from "./components/PublicLandingPage"
import NotFound from "./components/NotFound";

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
            <Route exact path="/" >
              <PublicLandingPage />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/boards/current">
              <CurrentBoardsPage />
            </Route>
            <Route exact path="/boards/:id">
              <SingleBoardPage />
            </Route>
            <Route exact path="/boards/:id/add-member">
              <AddMemberPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
