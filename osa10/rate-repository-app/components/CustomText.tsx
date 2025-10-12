import React from "react";
import { Text as RNText, TextProps, Platform } from "react-native";

export function CustomText(props: TextProps) {
  const platformFont = Platform.select({
    ios: "Arial",
    android: "Roboto",
    default: "System",
  });

  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: platformFont,
          fontWeight: "400",
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
}
