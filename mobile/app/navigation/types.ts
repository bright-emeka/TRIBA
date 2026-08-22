export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AppTabsParamList = {
  Feed: undefined;
  Search: undefined;
  Chat: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type AdminStackParamList = {
  Admin: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Admin: undefined;
  PostDetail: {postId: string};
};
