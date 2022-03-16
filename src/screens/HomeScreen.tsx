import React, { useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FlatList, FlatListProps, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { borderRadius, colors, fonts, globalStyles, height, Spacing, textSize, width } from '../constants'
import { StoreContext } from '../context'
import TodoCard from '../components/TodoCard'
import { RootStackParamList, Todo } from '../../types'
import { useNavigation } from '@react-navigation/native'


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
  const { todos } = useContext(StoreContext)
  const navigation = useNavigation<RootStackParamList>()
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.baseBg} />
      <View style={styles.header}>
        <View style={styles.textWrapper}>
          <Text style={styles.todoLabel}>Todo</Text>
          <Text style={styles.listLabel}>Lists</Text>
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
        <Text style={styles.add}>Add Item</Text>
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
    padding: width * 0.09,
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
    justifyContent:'space-around',
    backgroundColor:colors.baseBg
  }
})