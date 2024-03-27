import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

const ViewVideo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isClicked, setIsClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  console.log('videos Data', route.params.data);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      setPaused(true);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 5000);
    }
  }, [isClicked]);
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={THEME_COLOR} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../images/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.backButton}>
            <Image
              source={require('../images/download.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.backButton, {marginLeft: 20}]}>
            <Image
              source={require('../images/share.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoView}
        onPress={() => {
          setIsClicked(true);
        }}>
        <Video
          paused={paused}
          resizeMode="cover"
          source={{uri: route.params.data.item.video_files[0].link}}
          style={styles.video}
          onProgress={x => {
            setProgress(x);
            if (x.currentTime === x.seekableDuration) {
              setPaused(true);
            }
          }}
        />
        {isClicked && (
          <TouchableOpacity
            style={[
              styles.videoView,
              {
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignContent: 'center',
                position: 'absolute',
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setPaused(!paused);
              }}>
              <Image
                source={
                  paused
                    ? require('../images/play-button.png')
                    : require('../images/pause-button.png')
                }
                style={styles.playBtn}
              />
            </TouchableOpacity>
            <View style={styles.sliderView}>
              <Text style={styles.time}>
                {progress ? format(progress.currentTime) : 0}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                value={progress.currentTime}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#9E9E9E"
              />
              <Text style={styles.time}>
                {progress ? format(progress.seekableDuration) : 0}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Text style={styles.photographer}>
        {'Photographer Name : ' + route.params.data.item.user.name}
      </Text>
    </View>
  );
};

export default ViewVideo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    justifyContent: 'center',
    alignContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    position: 'absolute',
    marginTop: 50,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    top: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 25,
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  photographer: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoView: {
    width: '100%',
    height: 200,
  },
  playBtn: {
    width: 40,
    height: 40,
    tintColor: WHITE,
    alignSelf: 'center',
  },
  sliderView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  time: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '500',
  },
  slider: {
    width: '80%',
    height: 30,
  },
});
