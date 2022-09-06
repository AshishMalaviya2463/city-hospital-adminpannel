import * as ActionTypes from "./ationTypes"
// import { getAllDoctorsData, updateDoctorData, deleteDoctorData, postDoctorData } from '../../common/apis/doctor.api'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getDoctors = () => (dispatch) => {
    dispatch(loadingDoctors);

    setTimeout(async () => {
        // getAllDoctorsData()
        //     .then((data) => dispatch({ type: ActionTypes.GET_DOCTOR, payload: data.data }))
        //     .catch(error => dispatch(errorDoctors(error.message)));

        const querySnapshot = await getDocs(collection(db, "Doctors"));
        let datas = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.id)
            let data = {
                id: doc.id,
                ...doc.data()
            }
            datas = [...datas, data]
        });

        // console.log("all data : ", data)
        await dispatch({ type: ActionTypes.GET_DOCTOR, payload: datas });


    }, 2000)
}

export const addDoctor = (data) => (dispatch) => {
    try {
        // postDoctorData(data)
        //     .then((data) => dispatch({ type: ActionTypes.ADD_DOCTOR, payload: data.data }))
        //     .catch(error => dispatch(errorDoctors(error.message)));

        const doctorPPref = ref(storage, `doctorProfileImages/${data.profile_pic.name}`);

        uploadBytes(doctorPPref, data.profile_pic)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Doctors"), {
                            ...data,
                            profile_pic: url
                        });

                        dispatch({
                            type: ActionTypes.ADD_DOCTOR, payload: {
                                ...data,
                                id: docRef.id,
                                profile_pic: url
                            }
                        })
                    })
            });



    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const deleteDoctor = (id) => async (dispatch) => {
    try {

        await deleteDoc(doc(db, "Doctors", id));

        dispatch({ type: ActionTypes.DELETE_DOCTOR, payload: id })

        // deleteDoctorData(id)
        //     .then(dispatch({ type: ActionTypes.DELETE_DOCTOR, payload: id }))
        //     .catch(error => dispatch(errorDoctors(error.message)));
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const updateDoctor = (data) => async (dispatch) => {
    try {

        const { name, age, deg, experience, status } = data;

        console.log(data)

        const doctorRef = doc(db, "Doctors", data.id);

        const doctorPPref = ref(storage, `doctorProfileImages/${data.profile_pic.name}`);

        uploadBytes(doctorPPref, data.profile_pic)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        // const docRef = await addDoc(collection(db, "Doctors"), {
                        //     ...data,
                        //     profile_pic: url
                        // });

                        await updateDoc(doctorRef, {
                            name,
                            age,
                            deg,
                            experience,
                            status,
                            profile_pic: url
                        });

                        dispatch({
                            type: ActionTypes.UPDATE_DOCTOR, payload: {
                                ...data,
                                profile_pic: url
                            }
                        })
                    })
            });

        // updateDoctorData(data)
        //     .then((data) => dispatch({ type: ActionTypes.UPDATE_DOCTOR, payload: data.data }))
        //     .catch(error => dispatch(errorDoctors(error.message)));
    } catch (error) {
        dispatch(errorDoctors(error.message))
    }
}

export const loadingDoctors = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING })
}

export const errorDoctors = (data) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR, payload: data })
}