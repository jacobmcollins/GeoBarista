import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
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

import { getLocStorage } from '../Tools/initLocStorage';

class ComLineOptions extends Component {
    const {classes, open, getTextToDisplay, toggleOptionsMenu} = props;
    render () {
        return (
            <div>
                <Dialog fullScreen open={open} onClose={storeOptions} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={toggleOptionsMenu} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <div className={classes.grow}/>
                            <Button autoFocus color="inherit" onClick={toggleOptionsMenu}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <ListItemText primary={getTextToDisplay(thumbnails)} />
                        </ListItem>
                        <ListItem>
                            <TextField id="thumbnails1" fullWidth label={getLocStorage(thumbnails)} variant="filled"/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary={getTextToDisplay(thumbnails)} />
                        </ListItem>
                        <ListItem>
                            <TextField id="thumbnails2" label={getLocStorage(thumbnails)} variant="filled" fullWidth/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}