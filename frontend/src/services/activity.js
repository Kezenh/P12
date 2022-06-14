async function fetchActivityDatas(userId) {
    return fetch("http://localhost:4000/user/" + userId + "/activity")
    .then((response) => response.json())
    .then((res) => res.data.sessions)
    .catch((err) => console.log(err))
}

export default fetchActivityDatas