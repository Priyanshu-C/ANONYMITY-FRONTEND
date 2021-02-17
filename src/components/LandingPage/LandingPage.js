import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.scss";
import "./NavBar.scss";

import MainSvg from "./Assets/Main.svg";
import AnonymityLogo from "./Assets/letterBox.svg";
import FirstSection from "./Assets/firstSection.svg";
import SecondSection from "./Assets/secondSection.svg";
import { useHistory } from "react-router-dom";

// Logos
import { GrFacebook } from "react-icons/gr";
import { SiGmail, SiLinkedin, SiTwitter } from "react-icons/si";

import { useInView } from "react-intersection-observer";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const LandingPage = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useViewportScroll(ref);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
    const history = useHistory();
    return (
        <div ref={ref} className="welcome-container">
            <motion.div style={{ opacity }} className="NavBarContainer">
                <h1 className="NavBar-header">Anonymity</h1>
                <div className="NavBar-options">
                    <h5
                        className="NavBar-option"
                        onClick={(e) => history.push("/main")}
                    >
                        Sign In
                    </h5>
                    <h5
                        className="NavBar-option"
                        onClick={(e) => history.push("/main")}
                    >
                        Sign Up
                    </h5>
                    <h5 className="NavBar-option">Help</h5>
                </div>
            </motion.div>
            <div className="welcome-container__first-section">
                <div className="welcome-container__first-section__container">
                    {/* <img
                        src={AnonymityLogo}
                        alt="logo"
                        className="welcome-container__first-section__container-logo"
                    /> */}
                    <img
                        src={MainSvg}
                        alt="first-section-pic"
                        className="welcome-container__first-section__container-pic"
                    />
                    <div className="welcome-container__first-section__container-header">
                        Anonymity
                        <span
                            style={{
                                width: "15px",
                                height: "15px",
                                background: "#407DDA",
                                borderRadius: "50%",
                                display: "inline-block",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="welcome-container__second-section">
                <div className="welcome-container__second-section__first">
                    <div className="welcome-container__second-section__first-text">
                        Text anonymously <br />
                        Anywhere. Anyone.
                    </div>
                    <div className="welcome-container__second-section__first-image">
                        <img src={FirstSection} alt="" />
                    </div>
                </div>
                <div className="welcome-container__second-section__second">
                    <div className="welcome-container__second-section__second-image">
                        <img src={SecondSection} alt="" />
                    </div>
                    <div className="welcome-container__second-section__second-text">
                        Find new people, <br /> Express and Evolve.
                    </div>
                </div>
            </div>
            <div className="welcome-container__LetsGo">
                <button
                    onClick={(e) => history.push("/main")}
                    className="welcome-container__LetsGo-button"
                >
                    Let's Go
                </button>
            </div>
            <div className="welcome-container__footer-section">
                <div className="welcome-container__footer-section__first">
                    <h3 className="welcome-container__footer-section__first-header">
                        Anonymity
                    </h3>
                    <div className="welcome-container__footer-section__first-logos-container">
                        <h3>Contact Us</h3>
                        <GrFacebook className="welcome-container__footer-section__first-logos-container__logo" />
                        <SiGmail className="welcome-container__footer-section__first-logos-container__logo" />
                        <SiLinkedin className="welcome-container__footer-section__first-logos-container__logo" />
                        <SiTwitter className="welcome-container__footer-section__first-logos-container__logo" />
                    </div>
                </div>
                <div className="welcome-container__footer-section__second">
                    <h3 className="welcome-container__footer-section__second-header">
                        About us
                    </h3>
                    <p className="welcome-container__footer-section__second-sub">
                        This website is a mixture of Tinder and Omegle, you can
                        connect to anyone you want to within a given distance
                        maintaining complete anonymity hence the name anonymity.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
