let axios = require("axios");

const harperGetMessage = (room) => {
    const dburl = process.env.HARPERDB_URL;
    const dbpw = process.env.HARPERDB_PASS;
    if (!dburl || !dbpw) return null;

    let data = JSON.stringify({
        operation: "sql",
        sql: `SELECT * from realtime_chat_app.messages where room = '${room}' LIMIT 100`,
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
                resolve(JSON.stringify(response.data));
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

module.exports = harperGetMessage;
