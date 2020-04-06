//Example code from: https://material-ui.com/components/dialogs/#full-screen-dialogs
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import { getLocStorage, thumbnails } from '../Tools/initLocStorage';

export default function ComLineOptions(props) {
    const {classes, optionsMenuOpen, getTextToDisplay, toggleOptionsMenu, saveData, handleTextField} = props;


    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    return (
        <Dialog fullScreen={true} open={optionsMenuOpen} onClose={toggleOptionsMenu(false)} TransitionComponent={Transition}>
            <AppBar className={classes.appBarOptions}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleOptionsMenu(false)} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <div className={classes.grow}/>
                    <Button color="inherit" onClick={saveData}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <ListItemText primary={getTextToDisplay(thumbnails)}/>
                </ListItem>
                <ListItem>
                    <TextField id="thumbnails1" fullWidth label={getLocStorage(thumbnails)} onChange={handleTextField} variant="filled"/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={getTextToDisplay(thumbnails)}/>
                </ListItem>
                <ListItem>
                    <TextField id="thumbnails2" label={getLocStorage(thumbnails)} variant="filled" fullWidth/>
                </ListItem>
            </List>
        </Dialog>
    )
}