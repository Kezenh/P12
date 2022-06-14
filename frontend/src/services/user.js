async function fetchUserDatas() {
    return fetch("http://localhost:4000/user/18")
    .then((response) => response.json())
    .then((res) => res.data.userInfos.firstName)
    .catch((err) => console.log(err))
}

export default fetchUserDatas