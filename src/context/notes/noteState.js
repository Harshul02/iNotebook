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
        },
        {
          "_id": "637f191f59fewf55689d54c84906",
          "user": "637f17c5390bdcac32780202",
          "title": "My Personal Data",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2022-11-24T07:11:27.548Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(initialNotes)
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;