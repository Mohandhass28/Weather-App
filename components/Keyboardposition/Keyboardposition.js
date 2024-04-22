import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'

const Keyboardposition = ({ children }) => {
  return (
    <>
      {/* <KeyboardAvoidingView className='flex-1'> */}
        <ScrollView className='h-[100vh]'>{children}</ScrollView>
      {/* </KeyboardAvoidingView> */}
    </>
  )
}

export default Keyboardposition
