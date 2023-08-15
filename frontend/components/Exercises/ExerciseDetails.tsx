import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView } from "react-native";

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscleGroup: "chest" | "back" | "arms" | "abdominals" | "legs" | "shoulders";
  videoURL: string;
  imageURL: string;
}

type RouteParams = {
  ExerciseDetails: {
    exercise: Exercise;
  };
};

export default function ExerciseDetails() {
  const route = useRoute<RouteProp<RouteParams, "ExerciseDetails">>();
  const { exercise } = route.params;

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          {exercise.name}
        </Text>
        <YoutubePlayer height={200} play={false} videoId={exercise.videoURL} />
        <Text style={{ marginTop: 10 }}>{exercise.description}</Text>
      </View>
    </ScrollView>
  );
}
