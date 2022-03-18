import React, { useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts, globalStyles, Spacing, textSize, width } from '../../constants'
import { Task, Todo } from '../../../types'
import { GestureHandlerRootView, Swipeable, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { StoreContext } from '../../context'
import { SimpleCancelableNotification } from '../../utils/alert'


interface Props { item:Task, todo:Todo }

const TaskView:React.FC<Props> = ({ item,todo }) => {
    const { todos,handlerContext } = useContext(StoreContext)

    const onPress = () => {
      let remaining=0,completed=0;
      const newTodo = todo.tasks?.map( (one:Task) => {
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

    const onDelete = () => {
      SimpleCancelableNotification(
        'Are You Sure',
        'Continue to delete this task',
        () => {
          const newTasks = todo.tasks?.filter(one => one.id !== item.id)
          const newTodo = { ...todo,tasks: newTasks }
          const { completed,remaining } = newTodo
          if(item.isCompleted){
            newTodo.completed = Number(completed) - 1
          }else{
            newTodo.remaining = Number(remaining) -  1
          }

          const newTodos = todos?.map(one => one.id === todo.id ? newTodo : one )
          if(handlerContext)
          handlerContext('todos',newTodos)
        }
      )
    }

    const RightSwipeActions = () => (
      <TouchableOpacity style={styles.DeleteWrapper} onPress={onDelete}>
        <Text style={[globalStyles.btnText,{ color: colors.invertedMainText }]} >
          Delete
        </Text>
      </TouchableOpacity>
    );
  

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={RightSwipeActions}
        >
          <TouchableWithoutFeedback onLongPress={onDelete}>
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
          </TouchableWithoutFeedback>
        </Swipeable>
      </GestureHandlerRootView>
    )
  }

export default TaskView

const styles = StyleSheet.create({
    DeleteWrapper:{
        backgroundColor: colors.error,
        paddingHorizontal:width*0.05
    },
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
      marginHorizontal:Spacing,
      flex:1
    }
})