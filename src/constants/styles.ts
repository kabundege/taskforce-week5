import { StyleSheet,Platform } from 'react-native'
import { borderRadius, Spacing, textSize, width } from '.'
import colors  from './colors'
import fonts from './fonts'

export const globalStyles = StyleSheet.create({
    spacer:{
        margin:Spacing
    },
    flexer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    centerd:{
        justifyContent:"center",
        alignItems:"center",
    },
    btn: {
        padding:Spacing,
        borderRadius:borderRadius.XL,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth: Platform.OS === 'ios' ? 2 : 0 ,
        borderColor:"rgba(0,0,0,0.2)",
        shadowOffset:{width:0,height:0},
        shadowOpacity:.3,
        shadowRadius:10,
        elevation:5
    },
    btnText:{
        fontFamily: fonts.SemiBold,
        fontSize:20,
        color:colors.mainText,
    },
    input:{
        padding:10,
        width:"100%",
        fontSize:textSize.M,
        fontFamily: fonts.Medium,
        borderRadius: borderRadius.SM,
    },
    InputField:{
        width:'100%',
        borderWidth:1,
        borderColor:colors.darkBg,
        borderRadius: borderRadius.SM,
        justifyContent:"space-between",
        alignItems:'center',
        margin:Spacing
    }
})
