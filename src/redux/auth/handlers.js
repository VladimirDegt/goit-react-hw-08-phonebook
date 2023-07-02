export const handlePending = state => {
  state.isLoading = true;
};

export const handleFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
  state.isLoading = false;
};

export const handleRejected = state => {
  state.isLoggedIn = false;
  state.isLoading = false;
};

export const handleLogOutFulfilled = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoading = false;
  state.isLoggedIn = false;
};

export const handleRefreshUserPending = state => {
  state.isRefreshing = true;
};

export const handleRefreshUserFulfilled = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

export const handleRefreshUserRejected = state => {
  state.isRefreshing = false;
};
