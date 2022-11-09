let axios = require("axios");

const harperSaveMessage = (message, userName, room, createdTime) => {
    const dburl = process.env.HARPERDB_URL;
    const dbpw = process.env.HARPERDB_PASS;
    if (!dburl || !dbpw) return null;

    let data = JSON.stringify({
        operation: "insert",
        schema: "realtime_chat_app",
        table: "messages",
        records: [
            {
                message,
                userName,
                room,
                createdTime,
            },
        ],
    });

    let config = {
        method: "post",
        url: dburl,
        headers: {
            "Content-Type": "application/json",
            Authorization: dbpw,
        },
        data: data,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (response) {
                resolve("success");
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

module.exports = harperSaveMessage;
