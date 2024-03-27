import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {WHITE} from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const VideosItem = ({item}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity 
    activeOpacity={.8}
    onPress={()=>{
        navigation.navigate('ViewVideo', {data:item})
    }}
    style={{width: 300, height: 200, borderRadius: 10, marginLeft: 20}}>
      <Image
        source={{uri: item.item.image}}
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />
      <View
        style={{
          width: 300,
          height: 200,
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../images/video.png')}
          style={{width: 40, height: 40, tintColor: WHITE}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideosItem;
