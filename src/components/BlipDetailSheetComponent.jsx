import React, { useRef, useEffect } from 'react';
import { Card,  CardMedia, CardContent, CardActions, Button, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


function useOutsideAlerter(ref, ) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log(true)
        alert(true)
      }
    }
  
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
}

const BlipDetailSheetComponent = (props) => {
    const wrapperRef = useRef();
   // useOutsideAlerter(wrapperRef);
    return <div ref={wrapperRef} id="blip-detail-sheet">
            <Card className="blip-detail-sheet">
                <CardMedia title={props.name}>
                    
                </CardMedia>
                <CardContent>
                    <div className="blip-header">
                        <h2>
                            {props.name}
                        </h2>
                        
                    </div>
                    <h3>
                        {props.ring} | {props.radar}
                    </h3>
                    {props.desc}
                </CardContent>
                <CardActions>
                    <Button size="large" color="primary">
                        <Tooltip title="Merge 'n Commit!">
                            <Icon >
                                favorite
                            </Icon>
                        </Tooltip>
                    </Button>
                    <div id="blip-close-mobile" className="blip-close-button-mobile">
                        {props.element}
                    </div>
                </CardActions>  
        </Card>
    </div>
}

export default BlipDetailSheetComponent;