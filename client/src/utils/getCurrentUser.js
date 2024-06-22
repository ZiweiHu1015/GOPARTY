const getCurrentUser = () => {

  const userString = localStorage.getItem("currentUser");

  //console.log(userString);
  return JSON.parse(localStorage.getItem("currentUser"));
};

export default getCurrentUser