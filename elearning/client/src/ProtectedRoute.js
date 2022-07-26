import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
    component: Component,
    isAuthenticated: isAuthenticated,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log(isAuthenticated)
                if (isAuthenticated == "LOGGED_IN") {
                    return <Component {...props}/>;
                } else {
                    return (
                        <Redirect to={{ pathname: "/" }} />
                    );
                }
            }}
        />
    );
}

export default ProtectedRoute;