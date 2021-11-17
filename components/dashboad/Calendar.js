// import React, {useState} from 'react';
// import {View, Button, Platform , StyleSheet, Text} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Entypo } from '@expo/vector-icons';
// import moment from "moment";

// const Calendar = () => {
//   const date_today = moment().format('DD/MM/YY'); 
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [text, setText] = useState(date_today);

  

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);

//     let tempDate = new Date(currentDate);
//     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
//     // let fTime = 'Hours: ' + tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes() ;
//     setText(fDate)
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

// //   const showTimepicker = () => {
// //     showMode('time');
// //   };

//   return (
//     <View>
//       <View>
//         <Entypo name="calendar" size={24} color="black" onPress={showDatepicker} title="Show date picker!" />
//         {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
//       </View>
//       <View style={{marginTop: 20, alignItems: "center"}}>
//         <Text>{text}</Text>
//       </View>

//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
          
//         />
//       )}
//   </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     // backgroundColor: "#fff",
// //     flexDirection: "column"
// //     // alignItems: "center",
// //     // justifyContent: "center",
// //   },

// // });

// export default Calendar;