import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";

import Header from "../src/components/sections/Header";
import SignUp from "../src/components/pages/SignUp";
import SignIn from "../src/components/pages/SignIn";
import ForgotPassword from "../src/components/pages/ForgotPassword";
import Homepage from "../src/components/pages/Homepage";
import Dashboard from "../src/components/pages/Dashboard";
import PrivateRoute from "../src/components/auth/PrivateRoute";
import PublicRoute from "../src/components/auth/PublicRoute";
import Loader from "../src/components/UI/Loader";
import firebase from "../src/firebase/config";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "../src/store/actions/authActions";
import { RootState } from "../src/store";

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  //check if a user exist
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscript = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));

        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscript();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forget-password" component={ForgotPassword} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
