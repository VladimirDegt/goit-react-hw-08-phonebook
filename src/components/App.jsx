import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "redux/auth/operations";
import { useAuth } from "./hooks/useAuth";
import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { GlobalStyles } from "components/GlobalStyles";

const HomePage = lazy(() => import ('../pages/Home/Home'));
const ContactsPage = lazy(() => import ('../pages/Contacts/Contacts'));
const LoginPage = lazy(() => import ('../pages/Login/Login'));
const RegisterPage = lazy(() => import ('../pages/Register/Register'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <GlobalStyles/>
      <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
        } />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterPage />
              </Suspense>
          } />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
            } />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={
            <Suspense fallback={<div>Loading...</div>}>
              <ContactsPage />
            </Suspense>
          } />
          }
        />
        <Route path='*' element={
            <RestrictedRoute redirectTo="/" component={
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          } />
          } />
      </Route>
    </Routes>
    </>
    )
};
