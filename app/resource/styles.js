// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

export const colors = {
  "secondary": '#0686E4',
  "tertiary": '#ffffff',
  "background_dark": '#F0F0F0',
  "text_light": '#ffffff',
  "text_medium": '#464646',
  "text_dark": '#263238',
  "weather_text_color": '#464646',
  "transparent_white": '#FFFFFF00',
  "separator_background": '#E2E2E2',
};

// workaround since on iOS NotoSans works, but not NotoSans-Regular
// on Android it works as expected (ie NotoSans-Regular)
export const getFont = () => {
  if (require('react-native').Platform.OS === 'ios') {
    return 'FontAwesome';
  }
  else {
    return 'NotoSans-Regular';
  }
};

export const values = {
  "font_body": getFont(),
  "font_body_size": 14,
  "font_title_size": 20,
  "font_time_size": 12,
  "font_place_size": 20,
  "font_temp_size": 27,
  'border_radius': 2,
  "tiny_icon_size": 22,
  "small_icon_size": 40,
  "large_icon_size": 110,
};

// more info https://goo.gl/dqw4jF
export const header = {
  // background
  headerStyle: {
    backgroundColor: colors.secondary,
  },
  // arrows
  headerTintColor: colors.text_light,
  // my own styles for titleAndIcon
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  // my own styles for titleAndIcon
  text: {
    paddingLeft: 8,
    color: colors.text_light,
    fontFamily: values.font_body,
    fontSize: values.font_title_size,
    flex: 1
  },
  logo: {
    marginLeft: 12,
    marginRight: 12,
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius:24,
    borderWidth:1
  },
};

// styling for for DrawerView.Items in contentOptions
// more info - https://goo.gl/d74VUZ
export const drawer = {
  activeBackgroundColor: colors.tertiary,
  inactiveBackgroundColor: colors.secondary,
  inactiveTintColor: colors.text_light, // text color for inactive drawer items
  activeTintColor: colors.text_dark, // text color for active drawer items
  // style object for text style
  labelStyle: {
    fontFamily: values.font_body,
    fontSize: values.font_title_size,
  },
  // style object for the content section
  style: {
    backgroundColor: colors.secondary,
  },
};