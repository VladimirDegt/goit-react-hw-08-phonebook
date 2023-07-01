import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "redux/auth/operations";
import { useAuth } from "./hooks/useAuth";
import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";

const HomePage = lazy(() => import ('../pages/Home'));
const ContactsPage = lazy(() => import ('../pages/Contacts'));
const LoginPage = lazy(() => import ('../pages/Login'));
const RegisterPage = lazy(() => import ('../pages/Register'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
      <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={
        <Suspense>
          <HomePage />
        </Suspense>
        } />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={
              <Suspense>
                <RegisterPage />
              </Suspense>
          } />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={
            <Suspense>
              <LoginPage />
            </Suspense>
            } />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={
            <Suspense>
              <ContactsPage />
            </Suspense>
          } />
          }
        />
        <Route path='*' element={
            <RestrictedRoute redirectTo="/" component={
            <Suspense>
              <HomePage />
            </Suspense>
          } />
          } />
      </Route>
    </Routes>
    )
};
