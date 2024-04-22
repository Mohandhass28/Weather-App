import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../../theme'
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon
} from 'react-native-heroicons/outline'
import { debounce } from 'lodash'
import { fetchLocation, fetchWeatherForcast } from '../../api/weather'
import { weatherimages } from '../../constants'
import Keyboardposition from '../../components/Keyboardposition/Keyboardposition'
import Loading from '../../components/Loading/Loading'

const index = () => {
  const [showsearch, setshowsearch] = useState(false)
  const [loactions, setloaction] = useState([])
  const [weather, setweather] = useState([])
  const [isloading, setisloading] = useState(false)
  const handlelocation = async loc => {
    setisloading(true)
    setloaction([])
    setshowsearch(false)
    await fetchWeatherForcast({
      city: loc.name,
      day: '7'
    }).then(data => {
      setweather(data)
    })
    setisloading(false)
  }
  const handleText = value => {
    if (value.length > 3) {
      fetchLocation({ city: value }).then(data => {
        setloaction(data)
      })
    }
  }
  const handledebounce = useCallback(debounce(handleText, 1200), [])
  const { current, location } = weather

  const fetchMywether = async () => {
    setisloading(true)
    await fetchWeatherForcast({
      city: 'salem',
      day: '7'
    }).then(data => setweather(data))
    setisloading(false)
  }
  useEffect(() => {
    fetchMywether()
  }, [])
  return (
    <View className='relative flex-1'>
      <StatusBar style='light' />
      <Image
        source={require('../../assets/images/bg.png')}
        className='absolute h-full w-full'
        blurRadius={70}
      />
      {isloading ? (
        <Loading />
      ) : (
        <Keyboardposition>
          <SafeAreaView className='h-[100vh]'>
            <View style={{ height: '7%' }} className='mx-4 relative z-50 mt-4'>
              <View
                className='flex-row justify-end items-center rounded-full z-50'
                style={{
                  backgroundColor: showsearch
                    ? theme.bgWhite(0.2)
                    : 'transparent'
                }}
              >
                {showsearch ? (
                  <TextInput
                    onChangeText={handledebounce}
                    placeholder='Search City'
                    placeholderTextColor='lightgray'
                    className='pl-6 h-10 flex-1 text-base text-white'
                  />
                ) : null}
                <TouchableOpacity
                  style={{ backgroundColor: theme.bgWhite(0.3) }}
                  className='rounded-full p-3 m-1'
                  onPress={() => {
                    setshowsearch(!showsearch)
                  }}
                >
                  <MagnifyingGlassIcon size={24} color='white' />
                </TouchableOpacity>
              </View>
              {loactions.length > 0 && showsearch ? (
                <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
                  {loactions.map((loc, index) => {
                    let showborder = index + 1 != loactions.length
                    let borderClass = showborder
                      ? 'border-b-2 border-b-gray-400'
                      : ''
                    return (
                      <TouchableOpacity
                        key={index}
                        className={
                          'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                          borderClass
                        }
                        onPress={() => handlelocation(loc)}
                      >
                        <MapPinIcon size='27' color='gray' />
                        <Text className='text-black text-lg mt-2'>
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              ) : null}
            </View>
            <View className='mx-4 flex justify-around flex-1 mb-2'>
              <Text className='text-white text-center text-2xl font-bold'>
                {location?.name},
                <Text className='text-lg font-semibold text-gray-300'>
                  {location?.country}
                </Text>
              </Text>
              <View className='flex-row justify-center'>
                <Image
                  source={
                    weatherimages[current?.condition?.text]
                      ? weatherimages[current?.condition?.text]
                      : { uri: 'https:' + current?.condition?.icon }
                  }
                  className='w-52 h-52'
                />
              </View>
              <View className='space-y-2'>
                <Text className='text-center font-bold text-white text-6xl ml-5'>
                  {current?.temp_c}&#176;
                </Text>
                <Text className='text-white text-center text-xl tracking-widest'>
                  {current?.condition?.text}
                </Text>
              </View>
              <View className='flex-row justify-between mx-4'>
                <View className='flex-row space-x-2 items-center'>
                  <Image
                    source={require('../../assets/icons/wind.png')}
                    className='w-7 h-7'
                  />
                  <Text className='text-white font-semibold text-base'>
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className='flex-row space-x-2 items-center'>
                  <Image
                    source={require('../../assets/icons/drop.png')}
                    className='w-7 h-7'
                  />
                  <Text className='text-white font-semibold text-base'>
                    {current?.humidity}%
                  </Text>
                </View>
                <View className='flex-row space-x-2 items-center'>
                  <Image
                    source={require('../../assets/icons/sun.png')}
                    className='w-7 h-7'
                  />
                  <Text className='text-white font-semibold text-base'>
                    9:09 Am
                  </Text>
                </View>
              </View>
            </View>
            <View className='mb-2 space-y-3'>
              <View className='flex-row items-center mx-5 space-x-2'>
                <CalendarIcon size={27} color={'white'} />
                <Text className='text-white text-base'>Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date)
                  let options = {
                    weekday: 'long'
                  }
                  let dayName = date.toLocaleDateString('en-US', options)
                  dayName = dayName.split(',')[0]
                  return (
                    <View
                      className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                      style={{ backgroundColor: theme.bgWhite(0.15) }}
                      key={index}
                    >
                      <Image
                        source={
                          weatherimages[item?.day?.condition?.text]
                            ? weatherimages[item?.day?.condition?.text]
                            : { uri: 'https:' + item?.day?.condition?.icon }
                        }
                        className='h-11 w-11'
                      />
                      <Text className='text-white'>{dayName}</Text>
                      <Text className='text-center font-bold text-white'>
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </Keyboardposition>
      )}
    </View>
  )
}

export default index
