import React, {useState} from 'react';
import Colors from './color';

export const Theme = {
  dark: 'dark',
  light: 'light',
};

const themeLightColor = {
  primaryTextColor: Colors.BLACK,
  primaryBackground: Colors.WHITE,
  secondaryTextColor: Colors.GRAY,
  secondaryBackground: Colors.WHITE,
  separatorLineColor: Colors.BORDER,
  tabBarLineColor: Colors.TABBAR_LINE,
  modalTopLineColor: Colors.OFF_WHITE,
  tintColor: Colors.BLUE,
  backgroundTintColor: Colors.BLUE,
  greenColor: Colors.GREEN,
  redColor: Colors.RED,
};
const themeDarkColor = {
  primaryTextColor: Colors.WHITE,
  primaryBackground: Colors.BLACK,
  secondaryTextColor: Colors.GRAY,
  secondaryBackground: Colors.SECONDARY_BG,
  separatorLineColor: Colors.MODAL_BORDER_DARK,
  tabBarLineColor: Colors.TABBAR_LINE_DARK,
  modalTopLineColor: Colors.MODAL_BORDER_DARK,
  tintColor: Colors.THEME_BLUE,
  backgroundTintColor: Colors.THEME_BLUE,
  greenColor: Colors.THEME_GREEN,
  redColor: Colors.THEME_RED,
};
export const ThemeContext = React.createContext({
  theme: 'light',
  myColors: themeLightColor,
  changeTheme: theme => {},
});

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');
  const [myColors, setMyColors] = useState(themeLightColor);
  const changeTheme = myTheme => {
    if (myTheme === Theme.dark) {
      setTheme(Theme.dark);
      setMyColors(themeDarkColor);
    } else if (myTheme === Theme.light) {
      setTheme(Theme.light);
      setMyColors(themeLightColor);
    }
  };
  const color = theme === Theme.light ? Colors.WHITE : Colors.BLACK;
  const backgroundColor = theme === Theme.light ? Colors.BLACK : Colors.WHITE;
  return (
    <ThemeContext.Provider value={{theme, myColors, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
