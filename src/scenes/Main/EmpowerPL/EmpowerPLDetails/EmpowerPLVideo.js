import React from 'react';
import { Text, View } from 'react-native';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import style from './style';


export default function EmpowerPLVideo() {
    return (
    <View style={{alignItems: 'center'}}>
    <Text style={style.objectives}>EmpowerPL Video</Text>
    <View style={style.separator} />
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: require('../assets/empowerPL.mp4'),
        }}
        isPortrait={true}
        showFullscreenButton={false}
        showControlsOnLoad={true}
        playFromPositionMillis={0}
        style={{ width: '90%', height: '90%'}}
      />

    </View>

    );
  }
