import randomColor from "randomcolor";
import { colors } from "../constants";

export const getColor = () => randomColor({ hue: colors.primary, luminosity: 'dark' })
