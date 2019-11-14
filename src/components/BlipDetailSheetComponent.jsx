import React, {createRef, useRef /*, useEffect */} from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Tooltip
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

class BlipDetailSheetComponent extends React.Component {
    wrapperRef = createRef();


    constructor(props) {
        super(props);
        this.state = {
            comments: new Array(
                {autor: 'Petra', text: 'Coole Technologie'},
                {autor: 'Bernd', text: 'Großartig'},
                {autor: 'Franz', text: 'Toll'},
                {autor: 'Ute', text: 'Spitze!'},
                {autor: 'Patricia', text: 'Klasse'}
            ),
            newCommentAutor: "Jenny",
            newCommentText: "",
            showDiscussion: false,
        };
        this.addNewComment = this.addNewComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDiscussion = this.showDiscussion.bind(this);

    }

    addNewComment() {
        const modifiedComments = this.state.comments;
        modifiedComments.push({autor: this.state.newCommentAutor, text: this.state.newCommentText});
        this.setState({
            comments: modifiedComments
        });
    }

    showDiscussion(){
        if(this.state.showDiscussion===true){
            this.setState({showDiscussion: false});
        }
        else{
            this.setState({showDiscussion: true});
        }
    }

    handleChange(e) {
        this.setState({newCommentText: e.target.value});
    }

    render() {
        var commentListItems = this.state.comments.map(function (item) {
            return (
                <div>{item.autor} | {item.text}</div>
            );
        });
        let discussion;
        let buttonText;
        if(this.state.showDiscussion === true){
            discussion = (<div>
                {commentListItems}
                <input type="text" value={this.state.newCommentText}
                       onChange={this.handleChange}/>
                <Button size="large" color="primary" onClick={this.addNewComment}>
                    Send
                </Button>
            </div>);
            buttonText = (<span>
                Collapse all
            </span>)
        }
        else {
            discussion = null;
            buttonText = (<span>
                Show Discussion
            </span>)
        }

        // useOutsideAlerter(wrapperRef);
        return (
            <div ref={this.wrapperRef} id="blip-detail-sheet">
                <Card className="blip-detail-sheet">
                    <CardActions>
                        <div id="blip-close-mobile" className="blip-close-button-mobile">
                            {this.props.element}
                        </div>
                    </CardActions>
                    <CardMedia title={this.props.name}></CardMedia>
                    <CardContent>
                        <div className="blip-header">
                            <h2>{this.props.name}</h2>
                            <Button size="large" color="primary">
                                <Tooltip title="Merge 'n Commit!">
                                    <Icon>favorite</Icon>
                                </Tooltip>
                            </Button>
                        </div>
                        <h3>
                            {this.props.ring} | {this.props.radar}
                        </h3>
                        {this.props.desc}
                        {/*this.props.showDiscussion &&*/}
                        <Button size="large" color="primary" onClick={this.showDiscussion}>
                            {buttonText}
                        </Button>
                        {discussion}
                    </CardContent>
                </Card>
            </div>
        );
    }
}


export default BlipDetailSheetComponent;

// function useOutsideAlerter(ref, ) {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         console.log(true)
//         alert(true)
//       }
//     }

//     useEffect(() => {
//       // Bind the event listener
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         // Unbind the event listener on clean up
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     });
// }

// const BlipDetailSheetComponent = props => {
//   const wrapperRef = useRef();
//   // useOutsideAlerter(wrapperRef);
//   return (
//     <div ref={wrapperRef} id="blip-detail-sheet">
//       <Card className="blip-detail-sheet">
//         <CardMedia title={props.name}></CardMedia>
//         <CardContent>
//           <div className="blip-header">
//             <h2>{props.name}</h2>
//           </div>
//           <h3>
//             {props.ring} | {props.radar}
//           </h3>
//           {props.desc}
//           <div></div>
//         </CardContent>
//         <CardActions>
//           <Button size="large" color="primary">
//             <Tooltip title="Merge 'n Commit!">
//               <Icon>favorite</Icon>
//             </Tooltip>
//           </Button>
//           <div id="blip-close-mobile" className="blip-close-button-mobile">
//             {props.element}
//           </div>
//         </CardActions>
//       </Card>
//     </div>
//   );
// };