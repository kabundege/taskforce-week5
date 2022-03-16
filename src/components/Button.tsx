import React from 'react'
import { StyleProps } from 'react-native-reanimated'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StyleSheet,  Text, TouchableOpacity, View } from 'react-native'
import { borderRadius, colors, globalStyles, Spacing, textSize } from '../constants'

interface Props {
  label: string,
  success: boolean,
  onPress: () => void,
  BtnStyle?: StyleProps,
}

const Button:React.FC<Props> = ({ onPress,label,BtnStyle,success }) => (
    <TouchableOpacity style={[ globalStyles.btn,styles.btn,BtnStyle ]} onPress={onPress}>
      {
        success ?
          <AntDesign name="check" size={textSize.L} color={colors.invertedMainText} />: 
          <Text style={[ globalStyles.btnText,styles.btnText ]} >{label}</Text>
      }
    </TouchableOpacity>
  )


export default Button

const styles = StyleSheet.create({
  btn:{
    borderRadius: borderRadius.SM,
    width:'100%',
    marginTop:Spacing*2,
    paddingVertical:Spacing-5,
  },
  btnText:{
    color:colors.invertedMainText
  }
})