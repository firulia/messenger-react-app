import React, {Component} from 'react'
import classes from './Sidebar.module.css'
import logo from '../Logo/logo.png';

class Sidebar extends Component {
    render() {
        return (
            <div className={classes.sidebar}>
	            <div className={classes.sidebar_item}>
		            <img src={logo} alt="campoint AG" />
	            </div>
            </div>
        )
    }
}

export default Sidebar