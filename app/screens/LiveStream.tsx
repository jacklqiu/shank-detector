import React, { FC, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { LivestreamView } from "@api.video/react-native-livestream";

const LiveStreamScreen: FC = () => {
  const ref = useRef<any>(null);
  const [streaming, setStreaming] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <LivestreamView
        style={{ flex: 1, backgroundColor: "black", alignSelf: "stretch" }}
        ref={ref}
        video={{
          fps: 30,
          resolution: "720p",
          camera: "front",
          orientation: "portrait",
        }}
        liveStreamKey="t2QzvVSsUWCfBVrJcKtDLBUEirmbQ1mHTl2xTTtqLlw"
        onConnectionSuccess={() => {
          fetch("http://localhost:8080/predict/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liveStream: "",
              secondParam: "yourOtherValue",
            }),
          });
        }}
        onConnectionFailed={(e) => {
          //do what you want
        }}
        onDisconnect={() => {
          //do what you want
        }}
      />
      <View style={{ position: "absolute", bottom: 40 }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: streaming ? "red" : "white",
            width: 50,
            height: 50,
          }}
          onPress={() => {
            if (streaming) {
              ref.current?.stopStreaming();
              setStreaming(false);
            } else {
              ref.current?.startStreaming();
              setStreaming(true);
            }
          }}
        />
      </View>
    </View>
  );
};

export default LiveStreamScreen;
