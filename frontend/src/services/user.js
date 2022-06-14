async function fetchUserDatas(userId) {
    return fetch("http://localhost:4000/user/" + userId)
    .then((response) => response.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export default fetchUserDatas