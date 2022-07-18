const getRecipientEmail = (users, userLoggedIn) => {
  return users?.filter(userToFilter => userToFilter !== userLoggedIn)[0]
}

export default getRecipientEmail