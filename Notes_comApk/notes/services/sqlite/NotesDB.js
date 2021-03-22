import db from './SQLiteDatabase'

const insert = (note) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO notes (note) VALUES (?);", [note],

                (_, {rowsAffected, insertId}) => {

                    if(rowsAffected > 0)
                    {
                        resolve(insertId)
                    }
                    else
                    {
                        reject("Error inserting note: "+JSON.stringify(note))
                    }
                },
                error => reject(error)
                )
            }
        )

    })
}

const update = (obj) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("UPDATE notes SET note=? WHERE id=?", [obj.note, obj.id],

                (_, {rowsAffected, insertId}) => {
                    if(rowsAffected > 0)
                        resolve(insertId)
                    else
                        reject("Error updating obj: " + obj.id)
                },
                error => reject(error)
                )
            }
        )

    })
}

const remove = (id) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("DELETE FROM notes WHERE id=?", [id],

                (_, {insertId}) => {
                    resolve(insertId)
                },
                error => reject(error)
                )
            }
        )

    })
}

const findAll = () => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM notes;", [],

                (_, { rows }) => resolve(rows._array),
                error => reject(error),
                )
            }
        )

    })
}

const drop = () => {
    db.transaction(
        tx => {
            tx.executeSql("DROP TABLE notes;")
        }
    )
}

const createTable = () => {
    db.transaction(
        tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT);")
        }
    )
}

export default {
    insert,
    update,
    remove,
    findAll,
    drop,
    createTable,
}