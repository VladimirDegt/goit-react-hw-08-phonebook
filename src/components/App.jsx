import ContactsPage from "pages/Contacts";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";
import { Route, Routes } from "react-router-dom";
import { paths } from "utils/pathsPages";
import { Layout } from "./Layout";

export const App = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path={paths.register} element={<RegisterPage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.contacts} element={<ContactsPage />} />
        <Route path={paths.notFound} element={<HomePage />} />
      </Route>
    </Routes>
  );
};
