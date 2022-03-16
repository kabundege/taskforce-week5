import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import randomColor from 'randomcolor'
import { borderRadius, colors, fonts, globalStyles, height, Spacing, textSize, width } from '../../constants'
import React from 'react'
import { RootStackParamList, Todo } from '../../../types'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

interface Props {
    item: Todo 
}

const TodoCard: React.FC<Props> = ({ item: { title, remaining, completed,color,id } }) => {
    const navigation = useNavigation<RootStackParamList>()
    const onPress = () => {
        navigation.navigate('editTodo',{ id })
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper,{ backgroundColor:color } ]} >
            <LinearGradient 
                style={styles.Bg} 
                colors={['transparent', 'rgba(0,0,0,.5)']} 
            />
            <Text style={styles.title}>{title}</Text>
            <View style={{ margin: Spacing }} />
            <View style={globalStyles.centerd}>
                <Text style={styles.count}>{remaining}</Text>
                <Text style={styles.label}>Remaining</Text>
            </View>
            <View style={globalStyles.centerd}>
                <Text style={styles.count}>{completed}</Text>
                <Text style={styles.label}>Completed</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TodoCard

const styles = StyleSheet.create({
    Bg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: borderRadius.SM,
    },
    label: {
        color: colors.invertedMainText,
        fontSize: textSize.M,
        fontFamily: fonts.Medium
    },
    count: {
        color: colors.invertedMainText,
        fontSize: textSize.L,
        fontFamily: fonts.Medium
    },
    title: {
        fontSize: textSize.XL,
        fontFamily: fonts.Bold,
        color: colors.invertedMainText
    },
    wrapper: {
        width: width * 0.45,
        height: height * 0.35,
        ...globalStyles.centerd,
        borderRadius: borderRadius.SM,
    }
})