import React from 'react'
import {Toolbar, Fab} from '@material-ui/core'
import { Image as ImageIcon, Menu as MenuIcon } from '@material-ui/icons';

export default function Header(props) {
    const {classes, toggleMainMenu, toggleImageMenu} = props;
    return (
        <Toolbar className={classes.toolbar}>
            <Fab color="primary" className={classes.menuFab} onClick={toggleMainMenu(true)}>
                <MenuIcon />
            </Fab>
            <Fab className={classes.imageFab} onClick={toggleImageMenu(true)}>
                <ImageIcon />
            </Fab>
        </Toolbar>
    )
}
