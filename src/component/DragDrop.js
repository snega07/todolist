import './Style.css';
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import {v4} from 'uuid';
import Model from './Model';
const task1={
    id: v4(),
    name:"clean the house"
  }
  const task2={
    id: v4(),
    name:"clean the car"
  }
  function DragDrop() {
    const [state,setState]=useState({
      "not_started":{
        title:"Not Started",
        lists: [task1,task2]
      },
      "in-progress":{
        title:"In Progress",
        lists: []
      },
      "completed":{
        title:"completed",
        lists: []
      }
    });
    const [text,setText]= useState([]);
    const handleDragEnd=({destination,source})=>{
      console.log("from",source);
      console.log("to",destination);
      if(!destination){
        return
      }
      if(destination.index === source.index && destination.droppableId === source.droppableId){
        return
      }
      const copy = {...state[source.droppableId].lists[source.index]}
      console.log(copy) 
      setState(previous=>{
        previous={...previous}
        // remove from previous itmes array
        previous[source.droppableId].lists.splice(source.index,1);
         // adding to new items arrya location
        previous[destination.droppableId].lists.splice(destination.index,0,copy)
        return previous
      })
     
    }
    const addItem = () => {
      setState(previous => {
        return {
          ...previous,
          not_started: {
            title: "Not Started",
            lists: [
              {
                id: v4(),
                name: text
              },
              ...previous.not_started.lists
            ]
          }
        }
      })
  
      setText("")
    }
    return(
        <div>
            <div>
             <Model style={{float:'right'}} text={text} setText={setText} addItem={addItem}/></div>
      <div className='App'>
      
       <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state,(data,key)=>{
          return(
            <div key={key} className='column'>

                <div style={{paddingLeft:'25px',paddingTop:'20px'}}>

              <div className='title'>
                <center style={{paddingTop:'5px'}}>{data.title}</center>
                </div>

            <Droppable droppableId={key}>
              {
                (provided,snapshot)=>{
                  return(
                    <div ref={provided.innerRef}
                    {...provided.droppableProps} 
                    className='droppable-col'>
                      {data.lists.map((el,index)=>{
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id.toString()}>
                            {
                             
                              (provided)=>{
                                console.log(snapshot)
                                return(
                                  <div className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef} 
                                  {...provided.draggableProps} 
                                  {...provided.dragHandleProps}>
                                    {el.name}
                                  </div>
                                )
                              }
                            }
                          </Draggable>
                        )
                      })}
                    </div>
                  )
                }
              }
            </Droppable>
            </div>

            </div>
          )
        })
  
        }
       </DragDropContext>
      </div>
      </div>
    );
  }
  export default DragDrop;