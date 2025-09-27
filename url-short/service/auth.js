const sessionIdToUserMap = new Map(); // this gets refreshed everytime we restart our server

function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = { setUser, getUser };