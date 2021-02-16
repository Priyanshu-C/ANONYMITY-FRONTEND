import { Avatar } from "@material-ui/core";
import React, { useRef, useLayoutEffect, useMemo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { AvatarGenerator } from "random-avatar-generator";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            // animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
        large: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
    },
}));

function SidebarChat({ contact, selectedContact }) {
    const classes = useStyles();
    const sidechat = useRef();
    let active = false;
    useLayoutEffect(() => {
        //use this in SideChat with useRef

        const observer = new IntersectionObserver((entry) => {
            if (entry[0].intersectionRatio > 0) {
                entry[0].target.style.animation = `anim1 1s`;
                entry[0].target.dataset.triggered = true;
            } else {
                entry[0].target.style.animation = "none";
            }
        });
        //  const sideChat =  document.querySelector('.sidebarChat');
        //  console.log(sideChat)

        observer.observe(sidechat.current);

        return () => {
            observer.unobserve(sidechat.current);
        };
    }, []);

    if (contact && selectedContact && selectedContact[0] === contact[0]) {
        active = true;
    }
    const generator = new AvatarGenerator();
    const avatarIcon = useMemo(() => generator.generateRandomAvatar(), []);
    return (
        <>
            <div className="sidebarChat" ref={sidechat}>
                <div className={classes.root}>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        variant="dot"
                    >
                        <Avatar className={classes.large} src={avatarIcon} />
                    </StyledBadge>
                </div>
                <div className="sidebarChat_info">
                    <h2>{contact[1]}</h2>
                    {/* <p>This is the last message</p> */}
                </div>
            </div>
        </>
    );
}

export default SidebarChat;
