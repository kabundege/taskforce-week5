import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Alert, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { borderRadius, colors, fonts, globalStyles, height, Spacing, textSize, width } from '../constants'
import { StoreContext } from '../context'
import { RootStackParamList, Todo } from '../../types'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik';
import InputField from '../components/InputField'
import { getColor } from '../utils/getColor'
import Button from '../components/Button'
import { uuid } from '../utils/uuid'

const initialValues = {
  title:''
}

let RandomColors = Array.from({ length: 7 },() => getColor())

const initialTodo:Todo = {
  id: uuid(),
  title:'',
  color: '',
  remaining:0,
  completed:0,
  tasks:[]
}

const NewTodoScreen = () => {
  const [ todo,setTodo ] = useState<Todo>(initialTodo)
  const [ success,setSuccess ] = useState<boolean>(false)
  const { handlerContext,todos } = useContext(StoreContext)
  const navigation = useNavigation<RootStackParamList>()

  const { values,handleChange,handleSubmit } = useFormik({
    initialValues,
    onSubmit: async ({ title }) => {
      const payload = { ...todo,title }

      const exists = todos?.find( one => one.title.toLocaleLowerCase() === title.toLocaleLowerCase())

      if(exists){
        return Alert.alert('Creation Failure','Task Already Exists')
      }

      if(handlerContext)
      handlerContext('todos', todos ? [ ...todos,payload] : [payload])
      setSuccess(true)
      Keyboard.dismiss()
    },
  });

  useEffect(()=> setTodo({...todo,color: RandomColors[0]}),[RandomColors])

  //  When editing change the status
  useEffect(()=>{  if(values.title)setSuccess(false) },[values.title])

  const backHander = () => {
    navigation.goBack()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={backHander}>
            <AntDesign name="close" size={textSize.L} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.mainText}>Create Todo List</Text>
          <InputField 
            value={values.title} 
            placeholder="Todo Title" 
            onChange={handleChange('title')}
          />
          <View style={[globalStyles.flexer,styles.cubeWrapper]}>
            {
              React.Children.toArray(
                RandomColors?.map(color => 
                  <TouchableOpacity 
                    onPress={()=> setTodo({ ...todo,color })} 
                    style={[ styles.cube , { backgroundColor:color } ]} 
                  />
                )
              )
            }
          </View>
          <Button 
            label="Create !"
            success={success}
            BtnStyle={{ backgroundColor: todo.color || colors.primary }}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NewTodoScreen

const styles = StyleSheet.create({
  cube:{
    width:30,
    height:30,
    borderRadius: borderRadius.XS
  },
  cubeWrapper:{
    width:'100%',
  },
  mainText:{
    fontSize: textSize.XL,
    fontFamily: fonts.Bold,
    color: colors.mainText,
    textAlign:'center',
    width
  },
  container:{
    flex:1,
    ...globalStyles.centerd,
    paddingHorizontal:width*0.1,
  },
  header:{
    alignItems:'flex-end',
    padding:Spacing*2
  },
  screen:{
    backgroundColor: colors.baseBg,
    flex:1
  }
})