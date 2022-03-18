import React, { useCallback, useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FlatList, FlatListProps, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { borderRadius, colors, fonts, globalStyles, height, Spacing, textSize, width } from '../constants'
import { StoreContext } from '../context'
import TodoCard from '../components/TodoCard'
import { RootStackParamList, Todo } from '../../types'
import { useNavigation } from '@react-navigation/native'
import lang from '../languages'

//
import { createConnection, getRepository, Connection } from 'typeorm/browser';

import { Todo as TodoEntity } from '../db/entities/Todos'
import { Task as TaskEntity } from '../db/entities/Tasks'
import { getColor } from '../utils/getColor'

const TodoStyle = (props:FlatListProps<Todo> | Readonly<FlatListProps<Todo>>) => (
  /**
   * * Delivers Styles on 
   * * Each Todo Card
   * @params props
   */
  <View style={{ marginRight: width*0.1 }}>
    {props.children}
  </View>
)

const HomeScreen= () => {
  const [defaultConnection, setconnection] = useState<Connection | null>(null);
  const [ authors, setTodos] = useState<any>([]);
  const navigation = useNavigation<RootStackParamList>()
  const { todos } = useContext(StoreContext)

  const setupConnection = useCallback(async () => {
    try {
      const connection = await createConnection({
        type: 'react-native',
        database: 'test',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [TodoEntity, TaskEntity],
      });
      setconnection(connection);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTodos = useCallback(async () => {
    const todoRepository = getRepository(TodoEntity);
    let result = await todoRepository.find();
    if (result.length === 0) {
      const newTodo = new TodoEntity();
      newTodo.color = '#999';
      newTodo.title = 'Kill John Doe';
      newTodo.remaining = 0;
      newTodo.completed = 0;
      newTodo.tasks = [];
      newTodo.id = getColor();
      await todoRepository.save(newTodo);
      result = await todoRepository.find();
    }    
    setTodos(result);
  }, []);

  useEffect(() => {
    if (!defaultConnection) {
      setupConnection();
    } else {
      getTodos();
    }
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.baseBg} />
      <View style={styles.header}>
        <View style={styles.textWrapper}>
          <Text style={styles.todoLabel}>{lang.slog.split(" ")[0]}</Text>
          <Text style={styles.listLabel}>{lang.slog.split(" ")[1]}</Text>
        </View>
        <View style={styles.hr} />
      </View>
      <TouchableOpacity 
        style={globalStyles.centerd} 
        onPress={() => navigation.navigate('newTodo') }
      >
        <View style={styles.plusWrapper}>
          <AntDesign name="plus" size={textSize.M} color={colors.primary} />
        </View>
        <Text style={styles.add}>{lang.addItem}</Text>
      </TouchableOpacity>
      <View style={{ margin: Spacing*2 }} />
      <FlatList
        data={todos}
        horizontal={true}
        style={styles.list}
        pagingEnabled={true}
        snapToInterval={width*0.3}
        keyExtractor={el => el.id }
        renderItem={({ item }) => (
          <TodoCard item={item} />
        )}
        CellRendererComponent={TodoStyle}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  list:{ 
    paddingHorizontal: width * 0.1 
  },
  add:{
    fontFamily: fonts.Medium,
    fontSize:textSize.SM,
    color:colors.primary,
    marginVertical:5
  },
  plusWrapper:{ 
    padding: textSize.M,
    borderWidth:1,
    borderColor:colors.primary,
    borderRadius:borderRadius.SM
  },
  todoLabel:{  
    fontFamily:fonts.SemiBold,
    fontSize:textSize.XXL,
    color:colors.mainText,
    marginRight:width*0.02
  },
  listLabel:{ 
    fontFamily:fonts.Light,
    color:colors.primary,
    fontSize:textSize.XXL,
  },
  hr:{ 
    backgroundColor: colors.darkBg,
    position: 'absolute',
    width: width,
    height: 2 ,
    top:'48%',
  },
  textWrapper:{ 
    backgroundColor:colors.baseBg,
    padding: width * 0.07,
    ...globalStyles.flexer,
    position:'relative',
    zIndex:1,
  },
  header:{
    width,
    height: height * 0.3,
    ...globalStyles.centerd
  },
  screen:{
    flex:1,
    height,
    justifyContent:"space-evenly",
    backgroundColor:colors.baseBg
  }
})