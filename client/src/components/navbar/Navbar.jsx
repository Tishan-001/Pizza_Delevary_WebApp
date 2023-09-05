import React, { useState } from "react";
import { Link } from 'react-router-dom'
import classes from './navbar.module.css'
import {AiOutlineUser, AiOutlineShoppingCart} from 'react-icons/ai'

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false: true)
        return () => (window.onscroll = null)
    }
    return(
        <div className={`${classes.cantainer} ${isScrolled && classes.scrolled}`}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <Link to='/' className={classes.title}>
                        PizzaTaste
                    </Link>
                </div>
                <div className={classes.center}>
                    <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <a href="#">Home</a>
                    </li>
                    <li className={classes.listItem}>
                        <a href="#pizza">Pizza</a>
                    </li>
                    <li className={classes.listItem}>
                        <a href="#contactus">ContactUs</a>
                    </li>
                    <li className={classes.listItem}>
                        <a href="#faq">FAQ</a>
                    </li>
                    <li className={classes.listItem}>
                        <Link to='/create'>Create</Link>
                    </li>
                    </ul>
                </div>
                <div className={classes.right}>
                    <AiOutlineUser className={classes.userIcon}/>
                    <Link to='/cart' className={classes.cartContainer}>
                        <AiOutlineShoppingCart className={classes.cartIcon}/>
                        <div className={classes.cartQuantity}>0</div>
                    </Link>
                    <button className={classes.logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar