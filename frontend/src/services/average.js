/**
 * Fetch sessions datas 
 * @param { String } userId 
 * @return { Promise }
 */
async function fetchAverageSessionsDatas(userId) {
    return fetch("http://localhost:4000/user/" + userId + "/average-sessions")
    .then((response) => response.json())
    .then((res) => res.data.sessions)
    .catch((err) => console.log(err))
}

export default fetchAverageSessionsDatas