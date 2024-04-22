import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'

const Loading = () => {
  return (
    <View className='h-[100vh] items-center justify-center'>
      <Progress.Bar progress={120} width={250} height={10} indeterminate={true}/>
    </View>
  )
}

export default Loading
