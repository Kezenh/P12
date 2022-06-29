/**
 * Fetch performance datas 
 * @param { String } userId 
 * @return { Promise }
 */
async function fetchPerformanceDatas(userId) {
    return fetch("http://localhost:4000/user/" + userId + "/performance")
    .then((response) => response.json())
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

export default fetchPerformanceDatas