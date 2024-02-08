export const useGetUserInfo = () => {
  const { name, profilephoto, userid, isauth, email } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, profilephoto, userid, isauth, email };
};
