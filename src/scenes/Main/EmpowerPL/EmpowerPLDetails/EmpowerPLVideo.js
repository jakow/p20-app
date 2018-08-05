import React from 'react';
import { Text, View } from 'react-native';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import style from './style';


export default function EmpowerPLVideo() {
    const uri = 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=1&showinfo=0&controls=0';
    return (
    <View style={{alignItems: 'center'}}>
    <Text style={style.objectives}>EmpowerPL Video</Text>
    <View style={style.separator} />
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: 'https://r3---sn-hxugv2vgu-ajwe.googlevideo.com/videoplayback?initcwndbps=2518750&ipbits=0&mm=31%2C29&mn=sn-hxugv2vgu-ajwe%2Csn-f5f7ln7l&c=WEB&id=o-AC8on2C5w6JBglmfiFLb7rJblLXRqxdgErDTQSZQviX7&fvip=6&key=yt6&source=youtube&mv=m&dur=98.452&ms=au%2Crdu&ip=217.11.132.12&expire=1533487652&pl=24&ratebypass=yes&mt=1533465883&signature=9B19895F8D6E81720DE0F69ABB64CB7C8EA0EEC6.9A45C51F848755758C1A779E86BC752B074CE4E6&mime=video%2Fmp4&ei=xNVmW7r8IPvg7gTg_7mwBg&itag=22&requiressl=yes&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&lmt=1531488345866857',
          },
        }}
        isPortrait={true}
        showFullscreenButton={false}
        showControlsOnLoad={true}
        playFromPositionMillis={0}
        style={{ width: 320, height: 240}}
      />

    </View>

    );
  }
