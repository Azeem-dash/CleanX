import {Dimensions} from 'react-native';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

const BaseStyle = {
  DEVICE_HEIGHT: y,
  DEVICE_WIDTH: x,
};
module.exports = BaseStyle;
