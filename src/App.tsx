import React, {Fragment} from 'react';
import './App.css';
import {AuthContextProps, useAuth} from "react-oidc-context";

type InfoProps = {
    auth: AuthContextProps
}
const Info: React.FC<InfoProps> = ({ auth}) => {

    if (auth.isLoading) {
        return <span style={{opacity: 0}}>
            Loading...
        </span>
    }

    if (auth.isAuthenticated) {
        return <Fragment>
            <span>
                Authorized {auth.user?.profile.email}
            </span>
            <span>·</span>
            <a className="App-link" href={"#"}
               onClick={() => auth.signoutRedirect()}>
                Logout
            </a>
        </Fragment>
    }

    return <a className="App-link" href={"#"}
              onClick={() => auth.signinRedirect()}>
        Login
    </a>
}

function App() {
    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = React.useState(false);

    // automatically sign-in
    React.useEffect(() => {
        if (!auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
            !hasTriedSignin
        ) {
            auth.signinSilent();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Middly ID</h1>
                <p>
                    Gatekeeping server providing authentication for restricted services
                </p>
                <div className={"info"}>
                    <Info auth={auth} />
                </div>

                <div className={'logo'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
                        <defs>
                            <clipPath>
                                <rect width="1024" height="1024"/>
                            </clipPath>
                        </defs>
                        <g clipPath="url(#clip-Middly_Logo)">
                            <rect width="1024" height="1024" fill="rgba(255,255,255,0)"/>
                            <g transform="translate(0 1024)">
                                <path d="M0-512V-75H151V-949H0Z" transform="translate(0 0)" fill="#fff"/>
                                <path
                                    d="M693-787.4c-98.7,88.9-180.1,162.2-180.9,162.9-1.1,1.1,7.1,10.6,49.2,57.4,27.8,30.9,50.8,56.3,51,56.4.3.1,58.7-52.2,129.8-116.3S871.7-743.7,872.2-743.8c.4-.2.8,13.2.8,29.7V-684h151V-949H872.4Z"
                                    transform="translate(0 0)" fill="#fff"/>
                                <path
                                    d="M201-782l.1,113.5L468.1-372,735.2-75.5l43.9.3L823-75l-.1-65.2v-65.3L514.1-548.4c-169.9-188.5-309.8-343.8-311-344.9l-2.1-2.1Z"
                                    transform="translate(0 0)" fill="#fff"/>
                                <path d="M873-354.5V-75h151V-634H873Z" transform="translate(0 0)" fill="#fff"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </header>
        </div>
    );
}

export default App;
