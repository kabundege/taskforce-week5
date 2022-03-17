import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Alert, Keyboard, SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { borderRadius, colors, fonts, globalStyles, Spacing, textSize, width } from '../constants'
import { StoreContext } from '../context'
import { RootStackParamList, Task, Todo } from '../../types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFormik } from 'formik';
import InputField from '../components/InputField'
import TaskView from '../components/Task'
import { uuid } from '../utils/uuid'
import lang from '../languages'

const initialValues = {
  description:''
}

const EditTodoScreen = () => {
  const [ todo,setTodo ] = useState<Todo|undefined>()
  const { handlerContext,todos } = useContext(StoreContext)
  const navigation = useNavigation<RootStackParamList>()
  const route = useRoute<any>()

  const { id } = route.params;

  useEffect(()=> setTodo(todos?.find(one => one.id === id )) ,[todos])

  const { values,handleChange,handleSubmit,resetForm } = useFormik({
    initialValues,
    onSubmit: async ({ description }) => {

      const payload:Task = {
        id:uuid(),
        isCompleted:false,
        description
      }
      
      if(todo?.tasks){

        const exists = todo.tasks.find( one => one.description === description)

        if(exists) return Alert.alert('Creation Failure','Task Already Exists')

        const newTodos = todos?.map(one => 
          one.id === todo.id ? 
            { ...one,
              remaining: Number(one.remaining) + 1,
              tasks: [ ...(one?.tasks || []),payload ]
            } 
            : one )
        if(handlerContext)
        handlerContext('todos', newTodos)
        Keyboard.dismiss()
        resetForm()
      }
    },
  });

  const backHander = () => {
    navigation.goBack()
  }

  if(!todo)
  return (
    <View style={globalStyles.centerd}>
      <ActivityIndicator size={textSize.XXL} color={colors.primary} />
    </View>
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <SafeAreaView style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text numberOfLines={1} style={styles.mainText}>{todo.title}</Text>
            <TouchableOpacity style={styles.back} onPress={backHander}>
              <AntDesign name="close" size={textSize.L} color={colors.darkBg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.currentStatus} >
            {todo.completed} of {Number(todo.completed) + Number(todo.remaining)} tasks
          </Text>
          <View style={[styles.hr,{ backgroundColor: todo.color }]} />
        </SafeAreaView>
        <View style={globalStyles.spacer} />
        <FlatList 
          data={todo.tasks}
          keyExtractor={el => el.id}
          renderItem={({ item }) => <TaskView item={item} todo={todo} /> }
        />
        <View style={styles.InputWrapper}>
          <InputField 
            value={values.description} 
            placeholder={lang.title} 
            onChange={handleChange('description')}
          />
          <TouchableOpacity onPress={handleSubmit} style={[styles.plusWrapper,{ backgroundColor: todo.color }]}>
            <AntDesign name="plus" size={textSize.M} color={colors.invertedMainText} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditTodoScreen

const styles = StyleSheet.create({
  hr:{
    height:4,
    width:'100%'
  },
  currentStatus:{
    fontFamily: fonts.Medium,
    fontSize: textSize.M,
    color:colors.dimeText
  },
  back:{
    backgroundColor:colors.baseBg
  },
  plusWrapper:{ 
    padding: textSize.M+2,
    borderRadius:borderRadius.SM
  },
  mainText:{
    fontSize: textSize.XL+5,
    fontFamily: fonts.Bold,
    color: colors.mainText,
    flex:1
  },
  InputWrapper:{
    flex:1,
    ...globalStyles.flexer,
    paddingLeft:width*0.025,
    paddingRight:width*0.25,
    position:'absolute',
    bottom:0,
    width,
  },
  header:{
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingTop:Spacing*2,
    paddingRight:Spacing*2
  },
  headerWrapper:{
    paddingLeft: width * 0.2
  },
  screen:{
    backgroundColor: colors.baseBg,
    flex:1
  }
})