import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';

const DraggableColorList = SortableContainer((props) =>{
    return (
        <div style={{height : "98.5%"}}>
        {props.colors.map((color, i) => <DraggableColorBox 
        index={i}
        color={color.color} 
        key={color.name}
        name={color.name}
        removeColor={props.removeColor} />)}
        </div>
    );
});

export default DraggableColorList;