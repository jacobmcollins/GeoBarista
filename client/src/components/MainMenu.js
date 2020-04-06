import React from 'react'
import {Drawer, Toolbar, IconButton} from '@material-ui/core';
import {List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import {Cancel as CancelIcon, Add as AddIcon} from '@material-ui/icons';
import {initLocStorage} from "../Tools/initLocStorage";


export default function MainMenu(props) {
    const {classes, toggleMainMenu, open, openDialog} = props;
    return (
        initLocStorage(true);
    <Drawer anchor="left" open={open} onClose={toggleMainMenu(false)}>
            <div className={classes.mainMenu} role="presentation" onClick={toggleMainMenu(false)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton onClick={toggleMainMenu(false)}>
                        <CancelIcon />
                    </IconButton >
                </Toolbar>
                <List component="nav">
                    <ListItem button onClick={openDialog}>
                        <ListItemIcon >
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Load Image" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}
