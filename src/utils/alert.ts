import { Alert } from 'react-native';

export const SimpleNotification = (title:string, message:string, onPress:()=>void) => {
    return (
        Alert.alert(
            title, 
            message, 
            [{
                text: 'OK',
                onPress: !onPress ? () => {} : onPress
            }], 
        { cancelable: false })
    )
}

export const SimpleCancelableNotification = (title:string, message:string, onPress:()=>void) => {
    return (
        Alert.alert(
            title,
            message,
            [
            {
                text: "Cancel",
                onPress: () => {} ,
                style: "cancel"
            },
            { text: "OK", onPress }
            ],
            { cancelable: false }
        )
    
    )
}