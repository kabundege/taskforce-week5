import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { Alert, Keyboard, SafeAreaView, StyleSheet, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { borderRadius, colors, fonts, globalStyles, Spacing, textSize, width } from '../constants'
import { StoreContext } from '../context'
import { RootStackParamList, Task, Todo } from '../../types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useFormik } from 'formik';
import InputField from '../components/InputField'
import { getColor } from '../utils/getColor'
import { uuid } from '../utils/uuid'
import { Swipeable } from 'react-native-gesture-handler'

const initialValues = {
  description:''
}

let RandomColors = Array.from({ length: 7 },() => getColor())

const swipeFromLeftOpen = () => {
  Alert.alert('Swipe from left');
};
const swipeFromRightOpen = () => {
  Alert.alert('Swipe from right');
};

const EditTodoScreen = () => {
  const [ todo,setTodo ] = useState<Todo|undefined>()
  const { handlerContext,todos } = useContext(StoreContext)
  const navigation = useNavigation<RootStackParamList>()
  const route = useRoute<any>()

  const { id } = route.params;

  useEffect(()=> setTodo(todos?.find(one => one.id === id )) ,[todos])

  const LeftSwipeActions = () => {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingVertical: 20,
          }}
        >
          Bookmark
        </Text>
      </View>
    );
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#ff8303',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            color: '#1b1a17',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingVertical: 20,
          }}
        >
          Delete
        </Text>
      </View>
    );
  };

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
          renderItem={({ item }) => {

            const onPress = () => {
              let remaining=0,completed=0;
              const newTodo = todo.tasks?.map( one => {
                if(one.id === item.id){

                  if(!item.isCompleted){
                    completed += 1
                  }else{
                    remaining += 1
                  }

                  return { ...one, isCompleted: !item.isCompleted }
                }
                else {
                  if(one.isCompleted){
                    completed += 1
                  }else{
                    remaining += 1
                  }  
                  return one
                }
              })

              const newTodos = todos?.map(one => one.id === todo.id ? { ...one,remaining,completed,tasks:newTodo } : one)

              if(handlerContext)
              handlerContext('todos',newTodos)
            }

            return (
              <Swipeable
                renderLeftActions={LeftSwipeActions}
                renderRightActions={rightSwipeActions}
                onSwipeableRightOpen={swipeFromRightOpen}
                onSwipeableLeftOpen={swipeFromLeftOpen} 
              >
                <View style={styles.TaskWrapper}>
                  <TouchableOpacity onPress={onPress} >
                    {
                      item.isCompleted ?
                        <AntDesign name="checksquare" size={24} color={todo.color} />:
                        <Feather name="square" size={24} color={colors.dimeText} />
                    }
                  </TouchableOpacity>
                  <Text numberOfLines={1} style={[styles.taskDesc,{ opacity: item.isCompleted ? 0.5 : 1 }]}>
                    {item.description}
                  </Text>
                </View>
              </Swipeable>
            )
          }}
        />
        <View style={styles.InputWrapper}>
          <InputField 
            value={values.description} 
            placeholder="Todo Title" 
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
  taskDesc:{
    fontFamily:fonts.SemiBold,
    marginLeft:Spacing,
    color:colors.mainText,
    fontSize: textSize.M,
    textTransform:"capitalize"
  },
  TaskWrapper:{
    flexDirection:"row",
    marginVertical:Spacing,
    marginHorizontal:Spacing
  },
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