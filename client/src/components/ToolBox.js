import React from 'react';
import {Grid} from '@material-ui/core';
import {FilterNone as FilterNoneIcon, BorderColor as BorderColorIcon} from '@material-ui/icons';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';



export default function ToolBox(props) {
    const classes = props.classes;
    const tool = props.tool;
    const setTool = props.setTool;

    //new toolbox buttons can be added here
    const ButtonGroup = [
        <ToggleButton key={1} value="none" onClick = {setTool("none")}>
            <FilterNoneIcon />
        </ToggleButton>,
        <ToggleButton key={2} value="marker" onClick={setTool("marker")}  >
            <BorderColorIcon />
        </ToggleButton>,
        <ToggleButton key={3} value="drawRec" onClick={setTool("drawRec")}  >
            <BorderColorIcon />
        </ToggleButton>,
        <ToggleButton key={4} value="drawPoly" onClick={setTool("drawPoly")}  >
            <BorderColorIcon />
        </ToggleButton>,
    ]


    return (
       <Grid container>
           <Grid item>
               <div className={classes.ToolBox}>
               <ToggleButtonGroup size="medium" value={tool} exclusive>
                   {ButtonGroup}
               </ToggleButtonGroup>
               </div>
           </Grid>
       </Grid>
    )
}
