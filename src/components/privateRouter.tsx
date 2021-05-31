// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route } from "react-router-dom";

interface Props {
  component: any;
  exact: any;
  path: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem("email");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
