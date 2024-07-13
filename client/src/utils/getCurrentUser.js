const getCurrentUser = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentUser"));

  return currentUserData;
};

export default getCurrentUser