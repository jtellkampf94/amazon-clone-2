import { Fragment } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, loading, user } = useTypedSelector(
    state => state.auth
  );

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={props => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
