import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LineChart, BarChart, XAxis } from 'react-native-svg-charts';


type ExerciseStat = {
    value: number;
    label: string;
};

// Completed Workouts Component
function CompletedWorkouts() {
    const [completedWorkouts, setCompletedWorkouts] = useState(0);

    useEffect(() => {
        fetch('http://192.168.1.9:5001/completedWorkouts')
            .then(response => response.json())
            .then(data => setCompletedWorkouts(data.count));
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Completed Workouts</Text>
            <Text style={styles.value}>{completedWorkouts}</Text>
        </View>
    );
}

// Exercise Type Stats Component
function ExerciseTypeStats() {
    const [exerciseData, setExerciseData] = useState<number[]>([]);
    const [exerciseLabels, setExerciseLabels] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://192.168.1.9:5001/exerciseTypeStats')
            .then(response => response.json())
            .then((data: ExerciseStat[]) => {
                const dataValues = data.map(item => item.value);  // Assuming each item has a 'value' property
                const dataLabels = data.map(item => item.label); // Assuming each item has a 'label' property for the exercise type

                setExerciseData(dataValues);
                setExerciseLabels(dataLabels);
            });
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Exercise Type Stats</Text>
            <BarChart
                style={{ height: 200, flex: 1 }}
                data={exerciseData}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                contentInset={{ top: 20, bottom: 20 }}
            />
            <XAxis
                style={{ marginHorizontal: -10, marginTop: 10 }}
                data={exerciseLabels}
                formatLabel={(value, index) => exerciseLabels[index]}
                contentInset={{ left: 15, right: 15 }}
                svg={{ fontSize: 10, fill: 'black' }}
            />
        </View>
    );
}

// Average Workout Duration Component
function AverageWorkoutDuration() {
    const [averageDuration, setAverageDuration] = useState(0);

    useEffect(() => {
        fetch('http://192.168.1.9:5001/averageWorkoutDuration')
            .then(response => response.json())
            .then(data => setAverageDuration(data.duration));
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Average Workout Duration</Text>
            <Text style={styles.value}>{averageDuration} mins</Text>
        </View>
    );
}

// Longest and Shortest Workout Component
function LongestShortestWorkout() {
    const [longestWorkout, setLongestWorkout] = useState(0);
    const [shortestWorkout, setShortestWorkout] = useState(0);

    useEffect(() => {
        fetch('http://192.168.1.9:5001/longestAndShortestWorkout')
            .then(response => response.json())
            .then(data => {
                setLongestWorkout(data.longest);
                setShortestWorkout(data.shortest);
            });
    }, []);
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Longest Workout</Text>
            <Text style={styles.value}>{longestWorkout} mins</Text>
            <Text style={styles.title}>Shortest Workout</Text>
            <Text style={styles.value}>{shortestWorkout} mins</Text>
        </View>
    );
}

// Most Common Exercise Component
function MostCommonExercise() {
    const [mostCommonExercise, setMostCommonExercise] = useState('');

    useEffect(() => {
        fetch('http://192.168.1.9:5001/mostCommonExercise')
            .then(response => response.json())
            .then(data => setMostCommonExercise(data.exercise));
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Most Common Exercise</Text>
            <Text style={styles.value}>{mostCommonExercise}</Text>
        </View>
    );
}

// Workout Frequency Component
function WorkoutFrequency() {
    const [frequencyData, setFrequencyData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.9:5001/workoutFrequency')
            .then(response => response.json())
            .then(data => setFrequencyData(data.frequency));
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Workout Frequency</Text>
            <LineChart
                style={{ height: 200 }}
                data={frequencyData}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
            </LineChart>
        </View>
    );
}

// Main Statistics Component 
function WorkoutStatistics() {
    return (
        <ScrollView style={styles.container}>
            <CompletedWorkouts />
            <ExerciseTypeStats />
            <AverageWorkoutDuration />
            <LongestShortestWorkout />
            <MostCommonExercise />
            <WorkoutFrequency />
        </ScrollView>
    );
}


const styles = {
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        padding: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 24
        
        
    },
    value: {
        fontSize: 48,
    },
};

export default WorkoutStatistics;