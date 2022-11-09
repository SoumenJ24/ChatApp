function leaveRoom(userID, classRoomUsers) {
    return classRoomUsers.filter((user) => user.id !== userID);
}
module.exports = leaveRoom;
