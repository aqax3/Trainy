import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    // Fetch workouts from the server when the component mounts
    fetch('http://yourserver.com/workouts', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setWorkouts(data);
      // Create an object of dates to mark on the calendar
      const dates = data.reduce((acc: { [x: string]: { marked: boolean; }; }, workout: { date: string | number | Date; }) => {
        const date = new Date(workout.date).toISOString().split('T')[0]; // Format the date as 'yyyy-mm-dd'
        acc[date] = { marked: true };
        return acc;
      }, {});
      setMarkedDates(dates);
    })
    .catch(error => console.error(error));
  }, []);

  const WorkoutCalendar = () => {
    const [view, setView] = useState('daily'); // Default view is 'daily'
  
    const changeView = (newView: React.SetStateAction<string>) => {
      setView(newView);
    };
  
    const renderCalendar = () => {
      switch(view) {
        case 'daily':
          return <Calendar />; // Modify parameters for daily view
        case 'weekly':
          return <Calendar />; // Modify parameters for weekly view
        case 'monthly':
          return <Calendar />; // Modify parameters for monthly view
        default:
          return <Text>Error: Unknown view</Text>;
      }
    };
  

  return (
    <View>
      <Calendar markedDates={markedDates} />
      {/* Display workouts... */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Daily" onPress={() => changeView('daily')} />
        <Button title="Weekly" onPress={() => changeView('weekly')} />
        <Button title="Monthly" onPress={() => changeView('monthly')} />
      </View>
      {renderCalendar()}
    </View>
  );
  }
};

export default Calendar;
