import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider, AuthProviderProps} from "react-oidc-context";
import {WebStorageStateStore} from "oidc-client-ts";

const oidcConfig: AuthProviderProps = {
    authority: process.env.REACT_APP_AUTHORITY ?? "",
    client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URL ?? "",
    post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_OIDC_REDIRECT_URL,
    userStore: new WebStorageStateStore({
        store: localStorage
    }),
    loadUserInfo: true
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AuthProvider {...oidcConfig}>
        <App/>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
