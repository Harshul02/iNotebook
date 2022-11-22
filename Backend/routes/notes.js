const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

//Get all the notes
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
    const notes =await Note.find({user: req.user.id});
    res.send(notes);
    }catch(error){
        console.error(error.message);
    res.status(500).send("Internal server Error");
    }
});

//Post request to add notes
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters').isLength({ min: 5 })
], async (req,res)=>{
    try{
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    const note = new Note({
        user: req.user.id,title, description, tag
    });
    const saveNote = await note.save();
    res.json(saveNote);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
}
});

//Updating an existing note using post request

router.put('/updatenote/:id',fetchuser,
async (req,res)=>{
    const {title, description, tag} = req.body;

    try{
    const newNote = {};
    if(title){newNote.title = title;}
    if(description){newNote.description = description;}
    if(tag){newNote.tag = tag;}

    let note =await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json(note);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error"); 
}
});

//Deleting a Note

router.delete('/deletenote/:id',fetchuser,
async (req,res)=>{
    try{
    let note =await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted"});
}catch(error)
{
    console.error(error.message);
    res.status(500).send("Internal server Error"); 
}
});

module.exports = router;