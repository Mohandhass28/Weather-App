import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href="/home" />;
};

export default index;
