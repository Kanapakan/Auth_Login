import {firebase} from "../../database/firebaseDb";
import { auth } from "../../database/Auth";

const db = firebase.firestore()

export const toggleBookmark = (id) => {
    return { type: "BOOKMARK", recipeId: id };
}

export const toggleMealTime = (id, mealTime, order, carbs, fats, protein) => {
    
    // const day = String(datePick)
    // let myArray = ["2", "4", "6"];
    // const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    // const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

    // const userHis = db.collection('userMenu').doc(auth.currentUser?.uid);
    // if(order== "Add"){
    //     userHis.set({
    //         history: { date: arrayUnion(datePick),
    //         }
    //      });
    //     if(mealTime == 'breakfast'){
    //         // const alert = userHis.where('history', "==", datePick)
    //         // console.log(alert)
    //     } else if(mealTime == 'lunch'){
    //         userHis.set({
    //             history: { date: arrayUnion(datePick),
    //             lunch: arrayUnion(id),
    //             }
    //          });
    //     }else if(mealTime == 'dinner'){
    //         userHis.set({
    //             history: { date: arrayUnion(datePick),
    //             dinner: arrayUnion(id),
    //             }
    //          });
    //     }

    // } else{
    //     userHis.update({
    //         history: { 
    //             breakfast: arrayRemove(id),
    //             }
    //      });
    // }
    

    
    
    
    // userMenuFB.get()
    //             .then(querySnapshot  => {
    //             querySnapshot.forEach(documentSnapshot => {
    //                 if(documentSnapshot.id === auth.currentUser?.uid){
                                //   userMenuFB.add(
        //    
                    // }
        
        //   userMenuFB.add(
        //     Object.create({
        //         datePick: objHis
        //     }
        //     )
        
       
        

    return { type: "MEALTIME", recipeId: id, mealTime: mealTime, 
        order: order, 
        carbs: carbs, 
        fats: fats,
        protein: protein};
    }
export const toggleEatKcals = (kcals, order) => {
    return { type: "EATKCAL", eatKcals: kcals, order: order};
}
// export const toggleDinner = (id) => {
//     return { type: "DINNER", recipeId: id };
// }

//  -------------- store in Firebae History ------------------------