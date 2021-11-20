import React, { useRef, useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Platform, Animated, ScrollView, Image,TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import  {firebase} from '../database/firebaseDb'
import { auth } from '../database/Auth';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
// import { toggleUsers } from "../store/actions/UserAction";
import PieGraph from '../components/dashboad/PieGraph';
import BarChart from '../components/dashboad/BarChart';
import { createUser } from '../store/actions/UserAction';
import { fetched_recipeHistory } from '../store/actions/recipeAction';
import { fetch_userdetail } from '../store/actions/UserAction';
import { date_pickup } from '../store/actions/UserAction'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
const dbrealTime = firebase.app().database('https://fir-react-example-1e215-default-rtdb.asia-southeast1.firebasedatabase.app/');

const db = firebase.firestore()


const Home = ({navigation, route}, props) => {
    const [userArr, setUserArr]= useState([]);
    const [uHistoryArr, setUHistoryArr] = useState([]);
    const scrollYAnimatedValue =  useRef(new Animated.Value(0)).current;
    const HEADER_MIN_HEIGHT = 100;
    const HEADER_MAX_HEIGHT = 100
    const[isLoading, setisLoading] = useState(true);
    const eatKcal = (useSelector((state) => state.recipes.sumEatKcals))
    // const userData = (useSelector((state) => state.user.userData))
    const userDetailFB = db.collection('userDetail');
    


//  ----------- calendar -------------------------
    const date_today = moment().format('DD-MM-YYYY'); 
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [datePick, setDatePick] = useState(date_today);

    // ---------------- pie Graph --------------------------
    const [userHistory, setUserHistory] = useState([]);

    // console.log("hiiiiii", (useSelector((state) => state.recipes.allMeals)))
      const dispatch = useDispatch();
      
      const toggleRecipeHistory = (history) => {
        dispatch(fetched_recipeHistory(history));
        
        }
      const toggleUserDeail = (data) => {
          dispatch(fetch_userdetail(data));
      }
      const toggleDatePick = (data) => {
        dispatch(date_pickup(data));
      }
  

    
    useEffect(() => {
      
      const unsubscribe = userDetailFB.onSnapshot(getuser);
      // getUserHistory();
      
          return () => {
              unsubscribe();
              
              // unsubscribe2();
              
              
              
              
          }
    }, [datePick]);
  
  // ---------------------------- Get user Detail ---------------------------------
    const getuser = () => {
         userDetailFB
        .get()
        .then(querySnapshot  => {
          querySnapshot.forEach(documentSnapshot => {

            if(auth.currentUser?.uid === documentSnapshot.data().userId){
                
              const userArr2 = [];
              userArr2.push(documentSnapshot.data())
              setUserArr(userArr2[0])

              toggleUserDeail(userArr2[0])
              onChange(date_today)
              setisLoading(false)
              
              
            }
          });
      })
  }
  // ---------------------------- Get user History ---------------------------------
  const getUserHistory = (date) => {
    let data;
    dbrealTime.ref("user_History/userRecipe/" + auth.currentUser?.uid + "/" + date).on('value', snapshot => {
      console.log('user date :', snapshot.val())
      data = snapshot.val()
    
      if(data !== null){
        dbrealTime.ref("user_History/Recipe_of_day/" + data.dateKey).on('value', snapshot => {

          const user_history = snapshot.val()
          
          console.log('user recipes :', user_history.recipes)

          if(!(user_history.recipes == null)){
            console.log('fetch history :', Object.keys(user_history.recipes))
            
            toggleRecipeHistory(user_history)
            setUserHistory(user_history)
            
          }

      } )

      }         
        else{
          console.log('Nothinggggggg :')

                const space = Object.create({
                  date: "",
                  recipes: {
                    breakfastMeals: [],
                    lunchMeals: [],
                    dinnerMeals: [],
                  },
                  sumCal: 0,
                  sumNutrient: {
                    carbs: 0,
                    protein: 0,
                    fats: 0
                  },
                  userId: auth.currentUser?.uid
                })
                toggleRecipeHistory(space)
                   setUserHistory(space)
              }
    })
  }
  
  

 // ---------------------------- Pick Date ---------------------------------
  const onChange = (event, selectedDate) => {
    
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    // let fTime = 'Hours: ' + tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes() ;
    
    setDatePick(fDate)
    
    getUserHistory(fDate)
    toggleDatePick(fDate)
    

  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  
  // ตัวโหลดหน้า
   if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#547F53" />
            </View>
        )
    }

    // const { navigation } = this.props;
    const headerHeight = scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const headerBackgroundColor = scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: ['#000', '#000'],
        extrapolate: 'clamp'
      });



    return (
      <View style={styles.container} >
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }], {useNativeDriver: false}
          )}>
          <View style={styles.card}>
              <View style={styles.headContainer}>

              {/* -------------------------- calendar -------------------------------- */}
              <View>
                <Entypo name="calendar" size={24} color="black" onPress={showDatepicker} title="Show date picker!" />
                {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
              </View>
              

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  
                />
              )}

                  <Text style={styles.boldText}>ตารางอาหารวันที่</Text>
                  {/* <Text style={styles.boldText}>{date_create}</Text> */}
                  <View style={{marginTop: 20, alignItems: "center"}}>
                    <Text>{datePick}</Text>
                  </View>

              </View>

              <View style={[styles.Card]}>
                                  
                  {/* กดไปหน้า มื้ออาหาร */}
                   <TouchableOpacity style={styles.square} onPress={() => { navigation.navigate("ThreeTimeMeals", { mealTime: "breakfast", mealTimeThai: "มื้อเช้า" }) }}> 
                  <Image style={styles.foodImage} source={require("../assets/egg.png")} />
                  <Text style={styles.typeFood}>มื้อเช้า</Text>
                                          
                  
                   </TouchableOpacity>
                                  
                  <TouchableOpacity style={styles.square} onPress={() => { navigation.navigate("ThreeTimeMeals", { mealTime: "lunch", mealTimeThai: "มื้อกลางวัน" }) }}> 
                      <Image style={styles.foodImage} source={require("../assets/sanwich.png")}/>
                      <Text style={styles.typeFood}>มื้อกลางวัน</Text>
                                    
                     </TouchableOpacity>

                    <TouchableOpacity style={styles.square} onPress={() => { navigation.navigate("ThreeTimeMeals", { mealTime: "dinner", mealTimeThai: "มื้อเย็น" }) }}> 
                      <Image style={styles.foodImage} source={require("../assets/pasta.png")}/>
                      <Text style={styles.typeFood}>มื้อเย็น</Text>
                                      
                    </TouchableOpacity>
                              
              </View>

          </View>
               
               

                <PieGraph
                  // mealTime={route.params.mealTime}
                  style={{ width: "100%", height: "100%" }}
                  listData={userHistory}
                  dataUser={userArr}
                />
                <BarChart />

                
        </ScrollView>

{/* ------------------- cal Bar ----------------------------------------- */}
        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight}]}>
           
           {/* <View style={styles.item}>
                  <Text style={styles.hearderText2}>{date_create}</Text>
                </View> */}
            <View style={styles.item2}>
                {/* แอดค่า cal แล้ว */}
                <View style={styles.left}>
                    <Text style={styles.hearderText}>{userArr.TDEE}</Text>
                    <Text style={styles.hearderText2}>แคลอรี่ที่ควรได้รับ</Text>
                </View>

                <View style={{flex: 0.1}}>
                    <Text style={styles.hearderText}>-</Text>
                </View>

                <View style={styles.middle}>
                    <Text style={styles.hearderText}>{eatKcal}</Text>
                    <Text style={styles.hearderText2}>แคลอรี่อาหาร</Text>
                </View>

                <View style={{flex: 0.1}}>
                    <Text style={styles.hearderText}>=</Text>
                </View>

                <View style={styles.right}>
                    <Text style={styles.hearderText}>{userArr.TDEE - eatKcal}</Text>
                    <Text style={styles.hearderText2}>แคลอรี่คงเหลือ</Text>
                </View>
            
            </View>

        </Animated.View>

      </View>
    );
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "white",
      paddingTop: 20,
      // paddingBottom: 40,

    },
  preloader:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
} ,
    animatedHeaderContainer: {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    item:{
      backgroundColor: "#9bcc8f",
        width: "100%",
        flexDirection: "row",
        // padding: 2,
        paddingTop: 50,
        paddingBottom: 5,
        justifyContent: "center"
  },
    item2:{
        backgroundColor: "#9bcc8f",
        // justifyContent: "center",
        width: "100%",
        flexDirection: "row",
        padding: 2,
        paddingTop: 50,
        paddingBottom: 15,
        justifyContent: "center"
    },
    left:{
        flex: 1,
        paddingLeft: 5
    },
    middle:{
        flex: 1,
    },
    right:{
        flex: 1,
    },
    hearderText:{
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        alignSelf: 'center'
    },
    hearderText2:{
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff",
        alignSelf: 'center'
    },
    Card:{
        // backgroundColor:"white",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        borderColor: "#e4efe3",
        // borderWidth: 2,
        // borderRadius: 10,
        margin: -1,
        backgroundColor: "#e4efe3" ,
        
      },
      square:{
        width: 120,
        height: 80,
        borderColor: "#e4efe3",
        backgroundColor: "#fff",
        borderWidth: 4,
        borderRadius: 10,
        // padding: 5,
        // marginTop: 20,
        justifyContent: "center",
    },
      typeFood:{
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#6b6969",
        margin: 3
      },
      foodImage:{
        height: "40%",
        width: "45%",
        alignSelf: "center",
      },
      card:{
          flexDirection: "column",
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#e4efe3",
          margin: 20
      },
      headContainer:{
          flex: 1,
          padding: 15,
          backgroundColor: "#e4efe3",
      },
      boldText:{
          fontSize: 22,
          fontWeight: "bold",
          alignSelf: "center" 
      },
      infoContainer:{
        flex: 1,
        backgroundColor: "white"
        // padding: 15,
      },
      pieHead:{
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5
      },
      piefade:{
        fontSize: 16,
        color: "#adacaf",
        marginLeft: 10,
        marginBottom: 10
      },
      pieChartContainer:{
        flexDirection: "row",
        alignItems: "center"
      },
      pieChart:{
          flex: 1,
      },
      pieInfo:{
          
          flex: 1,
          marginLeft: 10,
      },
      info:{
        flexDirection: "row",
      },
      infoText:{
        flex: 0.3,
        fontSize: 16,
        padding: 5
      },
      infoText2:{
          flex: 1,
          fontSize: 16,
          fontWeight: "bold",
          padding: 5
      },
      barChartContainer:{
        alignItems: "center",
        paddingLeft: 0
      },
      


    
  });


  export default Home;