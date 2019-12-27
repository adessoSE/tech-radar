import React from "react";
import { Route, Redirect,withRouter } from "react-router-dom";
import { isAuth } from '../services/userService';
import DialogTitle from '@material-ui/core/DialogTitle';

const ProtectedRoute = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuth()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect to='/login'/>,
                        <DialogTitle id="alert-dialog-title">{"Sie müssen eingeloggt sein!"}</DialogTitle>

                    );
                }
            }}
        />
    );
};
export default withRouter(ProtectedRoute);