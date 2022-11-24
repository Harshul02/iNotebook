import React, { useState } from 'react'
import NoteContext from './noteContext';

const NoteState = (props)=>{

    const initialNotes = [
        {
          "_id": "637f190e5f955689d54c84904",
          "user": "637f17c5390bdcac32780202",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-11-24T07:11:10.779Z",
          "__v": 0
        },
        {
          "_id": "637f191f59fewf55689sdsd54c84906",
          "user": "637f17c5390bdcac32780202",
          "title": "My Personal Data",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-11-24T07:11:27.548Z",
          "__v": 0
        },
        {
          "_id": "637f191f59fw55689d54c84906",
          "user": "637f17c5390bdcac32780202",
          "title": "My Personal Data",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-11-24T07:11:27.548Z",
          "__v": 0
        }
      ]


      const [notes, setNotes] = useState(initialNotes);
      //Add a note
      const addNote = (title, description, tag)=>{
        //TODO: API Call
        const note = {
            "_id": "637f191f59fewf55689d54c84906",
            "user": "637f17c5390bdcac32780202",
            "title": title,
            "description": description,
            "tag": "personal",
            "date": "2022-11-24T07:11:27.548Z",
            "__v": 0
          }
          setNotes(notes.concat(note));
      }

      //Delete a note
      const deleteNote = (id)=>{
        console.log(id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
    }

      //Edit a note
      const editNote = (id, title, description, tag)=>{
        
    }


    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;