import { DatabaseParams, enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import { Todo } from '../../types';

const dbConfig: DatabaseParams = {
    name: "taskforce.db",
    location: "default"
}

// const db = ( async () => await openDatabase(dbConfig))()
enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase(dbConfig,()=>console.log('Sucessul +++++++'),(err)=>console.log("Error connecting ++++++ ",err));
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query= `DROP TABLE IF EXISTS todos,tasks CASCADE;
    CREATE TABLE todos (
        id uuid NOT NULL PRIMARY KEY,
        title varchar(20) NOT NULL,
        remaining int,
        completed int,
        color varchar(20) NOT NULL
      );
    CREATE TABLE tasks (
        id uuid NOT NULL PRIMARY KEY,
        todoid uuid NOT NULL,
        description varchar(255) NOT NULL,
        iscompleted boolean default false,
        FOREIGN KEY (todoid) REFERENCES todos(id) ON DELETE CASCADE
      );`
  
    await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<Todo[]> => {
    try {
      const todoItems: Todo[] = [];
      const results = await db.executeSql(`SELECT * FROM todos`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          todoItems.push(result.rows.item(index))
        }
      });
      return todoItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get todoItems !!!');
    }
  };
  
  export const saveTodoItems = async (db: SQLiteDatabase, todoItems: Todo[]) => {
    const insertQuery =
      `INSERT OR REPLACE INTO todos(id, title, color, remainig, completed, tasks) values` +
      todoItems.map(i => `(${i.id}, '${i.title}', '${i.color}', '${0}', $'${0}', '')`).join(',');
  
    return db.executeSql(insertQuery);
  };
  
  export const deleteTodoItem = async (db: SQLiteDatabase, id: string) => {
    const deleteQuery = `DELETE from todos where rowid = ${id}`;
    await db.executeSql(deleteQuery);
  };
  
  export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table todos`;
  
    await db.executeSql(query);
  };
