import React from "react";
import { Route, Redirect,withRouter } from "react-router-dom";
import { isAuth } from '../services/userService';


const ProtectedRoute = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuth()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
export default withRouter(ProtectedRoute);