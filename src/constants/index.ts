import colors from './colors'
import fonts from './fonts'
import { globalStyles } from './styles'
import layout from '../layout'

const { width,height,isTablet } = layout;
const Spacing = 15

const textSize = { XS:10,SM:13,M:15,L:27,XL:25,XXL:50 }
const borderRadius = { XS:5,SM:10,M:15,L:20,XL:25,XXL:30 }

export  { colors, fonts, globalStyles, borderRadius, width, height, isTablet, Spacing, textSize }
