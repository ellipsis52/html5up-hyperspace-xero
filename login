import React from 'react';
import {
    useAuth0
} from '@auth0/auth0-react';

const Login = () => {
    const {
        loginWithRedirect,
        isAuthenticated
    } = useAuth0();

    if (isAuthenticated) {
        return <p > You are logged in ! < /p>;
    }

    return ( <
        div >
        <
        button onClick = {
            () => loginWithRedirect()
        } > Login with Auth0 < /button> < /
        div >
    );
};

export default Login;
import React, {
    useEffect,
    useState
} from 'react';
import {
    useAuth0
} from '@auth0/auth0-react';
import axios from 'axios';

const Dashboard = () => {
        const {
            user,
            isAuthenticated,
            logout
        } = useAuth0();
        const [data, setData] = useState(null);

        useEffect(() => {
            if (isAuthenticated) {
                // Appel au backend pour récupérer les données de l'utilisateur Xero
                axios.get('/dashboard', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }).then(response => {
                    setData(response.data);
                }).catch(err => console.error(err));
            }
        }, [isAuthenticated, user]);

        if (!isAuthenticated) {
            return <div > You need to log in first. < /div>;
        }

        return ( <
            div >
            <
            h1 > Welcome, {
                user.name
            } < /h1> <
            div > {
                data ? < pre > {
                    JSON.stringify(data, null, 2)
                } < /pre> : 'Loading data from Xero...'}</div >
                <
                button onClick = {
                    () => logout({
                        returnTo: window.location.origin
                    })
                } > Logout < /button> < /
                div >
            );
        };

        export default Dashboard;