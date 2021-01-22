import axios from 'axios';
import configData from '../config.json';
import {ServerResponseException} from '../exceptions/ServerException';
import defaultMember from '../images/Users/default.png'
import {OK} from '../models/HTTPCodes'

const url = `${configData.SERVER_URL}/${configData.channelId}`

export async function getMessages(users) {

    const result = await axios.get(url)

    if (result.status !== OK) {
        throw new ServerResponseException(`Server response status error: ${JSON.stringify(result)}`);
    }
    const data = result.data;
    if (!data.success || data.error.code !== 0) {
        throw new ServerResponseException(`Server error: ${JSON.stringify(result)}`);
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
}

export async function sendMessage(textObj) {

    const headers = {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
    }

    const response = await axios.post(url, JSON.stringify(textObj), {
        headers: headers
    })

    if (response.status !== OK) {
        throw new ServerResponseException(`Server response status error: ${response.status}`);
    }
    const data = response.data;
    if (!data.success || data.error.code !== 0) {
        throw new ServerResponseException(`Server error: ${JSON.stringify(data)}`);
    }

    return response
}