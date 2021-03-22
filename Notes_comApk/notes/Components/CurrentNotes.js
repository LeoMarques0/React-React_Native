import 'react-native-gesture-handler';
import NotesDB from '../services/sqlite/NotesDB'

export let Notes = class {

    static currentNotes = [];

    static amountOfNotes() {
        return this.currentNotes.length
    }

    static PushNote(text, index){
        console.debug(index);
        if(index === -1)
        {
            console.debug('push');
            if(text)
            {
                this.currentNotes.push( {note : text} );
                NotesDB.insert( text )
                    .then ((response) => {
                        this.currentNotes[this.currentNotes.length-1] = {note: text, id: response};
                        console.debug(this.currentNotes.length);
                    })
                    .catch ((err) => console.log('insert ' + err))
            }
        }
        else
        {
            console.debug('equals');
            if(text)
            {
                this.currentNotes[index] = {note : text, id: this.currentNotes[index].id};
                console.debug(this.currentNotes[index].id);
                NotesDB.update( { note : text, id : this.currentNotes[index].id } )
                    .catch ((err) => console.log('update ' + err))
            }
            else
            {
                this.currentNotes.splice(index, 1)
                NotesDB.remove( { id : this.currentNotes[index].id } )
                    .catch ((err) => console.log('remove ' + err))
            }
        }
    }

}