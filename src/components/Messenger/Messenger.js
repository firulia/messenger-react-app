import React, { Component } from 'react'
import classes from './Messenger.module.css'
import member1 from '../../images/Users/1.jpg';
import member2 from '../../images/Users/2.jpg';
import member3 from '../../images/Users/3.jpg';
import member4 from '../../images/Users/4.jpg';
import plus from '../../images/Icons/plus.svg';
import arrow from '../../images/Icons/arrow.svg';
import submit from '../../images/Icons/submit.svg';
import smiley from '../../images/Icons/smiley.svg';
import configData from '../../config.json';
import { formatAMPM } from '../../converter';
import { ReactSVG } from 'react-svg';
import { getMessages, sendMessage } from '../../service/MessagesService';
import io from 'socket.io-client'

class Messenger extends Component {

    state = {
        messages: [],
        text: ''
    }

    users = [{ //created because of no info about icon sources for each user
        id: 1,
        icon: member1,
        color: "#31ade4"
    },
    {
        id: 2,
        icon: member2,
        color: "#DEA43E"
    },
    {
        id: 30, //random id
        icon: member3,
        color: "#FC00FF"
    },
    {
        id: 40, //random id
        icon: member4,
        color: "#EDF1F5"
    },

    ]

    componentDidMount() {
        this.connectSocket()
        this.loadMessages()
    }

    async loadMessages() {
        const messages = await getMessages(this.users)
        this.setState({ messages })
    }

    // It makes possible to see a new messages. DDoS because WebSocket is not available :) 
    timer = setInterval(() => {
        this.loadMessages()
    }, 2000)

    render() {
        if (this.state.messages.length === 0) {
            return <div>No messages</div>
        }
        return (
            <div className={classes.Messenger}>
                <div className={classes.Messenger_frame}>
                    <header className={classes.Messenger_header}>
                        <ReactSVG className={classes.Messenger_arrow} src={arrow} />
                        {configData.name}'s Groupchat
                    </header>
                    <div className={classes.Messenger_members}>
                        {this.renderMembers()}
                        <ReactSVG className={classes.Messenger_members_icon} src={plus} />
                    </div>
                    <div className={classes.Messenger_message_list}>
                        <div className={classes.Messenger_message_list_wrapper}>
                            {this.renderMessages()}
                        </div>
                    </div>
                    <div className={classes.Messenger_action_bar}>
                        <div className={classes.Messenger_action_bar_wrapper}>
                            <div className={classes.Input_wrapper}>
                                <input className={classes.Messenger_action_bar_input} type="text" title="Message" onChange={this.handleInput} value={this.state.text} />
                                <ReactSVG className={classes.Messenger_action_bar_input_icon} src={smiley} />
                            </div>
                            <button className={classes.Messenger_action_bar_btn} type="button" onClick={this.sendMessageEventHandle}>
                                <ReactSVG className={classes.Messenger_action_bar_btn} src={submit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderMembers() {
        return this.users.map((user, i) => (
            <img key={i} className={classes.Messenger_members_item} style={{ borderColor: user.color }} src={user.icon} alt={"Member" + user.id} />
        ))
    }

    renderMessages() {

        return this.state.messages.map((v, i) => (
            <div className={classes.Messenger_message_list_wrapper___distanz} key={i}>
                <img className={classes.Messenger_members_item} style={{ borderColor: v.user.color }} src={v.user.icon} alt="Member 1" />
                <div className={classes.Messenger_message_list_item} style={{ backgroundColor: v.user.color }} >
                    <div className={classes.Messenger_message_list_wrapper_info}>
                        <div className={classes.Messenger_message_list_item_userName}>{v.user.name}</div>
                        <div className={classes.Messenger_message_list_item_userDate}>{formatAMPM(v.sentAt)}</div>
                    </div>
                    {v.text}
                </div>
            </div>));
    }

    handleInput = event => {
        this.setState({
            text: event.target.value
        })
    }

    sendMessageEventHandle = () => {
        const textObj = {
            "text": this.state.text,
            "name": configData.name
        }
        this.sendMessageHandle(textObj)
    }

    sendMessageHandle(textObj) {
        sendMessage(textObj)
        this.setState({
            text: ''
        });
        this.loadMessages()
    }

    connectSocket = () => {
        io('http://localhost:8081')
    }

}

export default Messenger