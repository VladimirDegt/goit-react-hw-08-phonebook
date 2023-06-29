import { useSelector } from "react-redux";
import { selectIsLoading, selectIsLoggedIn, selectIsRefreshing, selectUser } from "redux/auth/selectors";

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(selectIsLoggedIn),
    isRefreshing: useSelector(selectIsRefreshing),
    user: useSelector(selectUser),
    isLoading: useSelector(selectIsLoading),
  };
};
