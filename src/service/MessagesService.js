import axios from 'axios';
import configData from '../config.json';
import {
    ServerResponseException
} from '../exceptions/ServerException';
import defaultMember from '../images/Users/default.png'

const url = `${configData.SERVER_URL}/${configData.channelId}`

export async function getMessages(users) {
    return axios.get(url)
        .then(res => {
            if (res.status !== 200) {
                throw new ServerResponseException(`Server response status error: ${res.status}`);
            }
            const data = res.data;
            if (!data.success || data.error.code !== 0) {
                throw new ServerResponseException(`Server error: ${JSON.stringify(data)}`);
            }
            return data.data.messages.map(v => {
                const user = users.find(user => user.id === v.user.id);
                if (typeof user === "undefined") {
                    return {
                        id: v.id,
                        sentAt: v.sentAt,
                        text: v.text,
                        user: {
                            id: v.user.id,
                            name: v.user.name,
                            color: "EDF1F5",
                            icon: defaultMember
                        }
                    };
                }
                return {
                    id: v.id,
                    sentAt: v.sentAt,
                    text: v.text,
                    user: {
                        id: v.user.id,
                        name: v.user.name,
                        color: user.color,
                        icon: user.icon
                    }
                };
            });
        });
}

export function sendMessage(textObj) {

    const headers = {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    }

    return axios.post(url, JSON.stringify(textObj), {
        headers: headers
    }).then(res => {
        if (res.status !== 200) {
            throw new ServerResponseException(`Server response status error: ${res.status}`);
        }
        const data = res.data;
        if (!data.success || data.error.code !== 0) {
            throw new ServerResponseException(`Server error: ${JSON.stringify(data)}`);
        }
        return res
    })
}