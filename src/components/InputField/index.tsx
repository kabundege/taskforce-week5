import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { colors, globalStyles } from '../../constants'

interface Props {
    value: string,
    placeholder:string,
    onChange: (e: string) => void
}

const InputField:React.FC<Props> = ({ value,placeholder,onChange }) => (
    <View style={globalStyles.InputField}>
      <TextInput
        onChangeText={onChange}
        placeholderTextColor={colors.darkBg}
        style={globalStyles.input}
        placeholder={placeholder}
        value={value}
        /> 
    </View>
  )

export default InputField

const styles = StyleSheet.create({})
