import LocalizedStrings from 'react-native-localization';

import en from './english'
import fr from './french'

const supportedLanguages = { en,fr }

const lang = new LocalizedStrings(supportedLanguages)

/**
 * * Change Languages
 * ? fr, en, it ..etc
 */
// lang.setLanguage('fr')
// console.log(lang.getLanguage())

export default lang
