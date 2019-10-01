import React from 'react';
import { Slide, Paper, Button, Icon, List, ListItem, ListItemText } from '@material-ui/core';

const BlipListingComponent = (props) => {

    const result = Object.values(props);
    const use = result.filter(element => element.ring === 'einsetzen'),
          evaluate = result.filter(element => element.ring === 'evaluieren'),
          rethink = result.filter(element => element.ring ==='überdenken');

    return <div>
        <Slide in={true} direction="left">
            <div className="list-parent">
                <Paper className="blips-list">
                        <List className="ring-list">
                            <h6>Einsetzen</h6>
                            {use.map((ele, index) => {
                                return <ListItem button key={index} onClick={() => props.openInfo(ele)}>
                                    <ListItemText primary={ele.name}></ListItemText>
                                </ListItem>
                            })}
                        </List>
                        <List className="ring-list">
                            <h6>Evaluieren</h6>
                            {evaluate.map((ele, index) => {
                                return <ListItem button key={index} onClick={() => props.openInfo(ele)}>
                                    <ListItemText primary={ele.name}></ListItemText>
                                </ListItem>
                            })}
                        </List>
                        <List className="ring-list">
                            <h6>Überdenken</h6>
                            {rethink.map((ele, index) => {
                                return <ListItem button key={index} onClick={() => props.openInfo(ele)}>
                                    <ListItemText primary={ele.name}></ListItemText>
                                </ListItem>
                            })} 
                        </List>
                </Paper>
                <Button className="close-button" variant="contained" color="primary" onClick={props.onClick}>
                    <Icon>
                        clear
                    </Icon>
                </Button>
            </div>        
        </Slide>
    </div>
}

export default BlipListingComponent;
