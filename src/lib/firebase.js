import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import {getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, serverTimestamp, query, where, collectionGroup, Timestamp, } from "firebase/firestore"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "ecommerce-f6c82.firebaseapp.com",
    projectId: "ecommerce-f6c82",
    storageBucket: "ecommerce-f6c82.appspot.com",
    messagingSenderId: "637659560469",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-53T1WFVFNN"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();
  
  export const auth = getAuth(app);
  export const storage = getStorage(app)
  
  
  
export const handleSubmitReview = async(e,id,rating,text) => {
  e.preventDefault();
  console.log('click')
  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
  //  const q = query(collection(db, "cities"), where("capital", "==", true));

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // const unsubscribe = onSnapshot(
  //  query(collectionGroup(db, 'landmarks'), where('type', '==', 'museum')), 
  // (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //   console.log(doc.id, ' => ', doc.data());
  //  });
  // },
  // (error) => {
  //   console.log(error);
  // });
  
  // // Stop listening to changes
  // unsubscribe();

try {
  const docRef = doc(db, "users", auth.currentUser.uid);
  await setDoc(docRef, {
    ownerUID:auth.currentUser.uid
  },{merge:true})
  await setDoc(doc(db,`users/${docRef?.id}/comments`,id), {
    commentID:id,
    name: auth.currentUser.displayName,
    imgUrl: auth.currentUser.photoURL,
    rating:rating,
    text:text,
    timestamp: serverTimestamp()
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
  
}


export const logOut = async (setLoading) => {
  setLoading(true)
  await signOut(auth).then(() => {
    localStorage.setItem('username','')
    localStorage.setItem('userImg', '')
    document.querySelector('.userImage').classList.add('hidden')
    setLoading(false)
   })
}

  
export const showError = async (error,setError) => {
    if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
     return setError('password is incorrect')
    }
    if (error.code === AuthErrorCodes.INVALID_EMAIL) {
     return setError('Email is invalid')
    }
  if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
    return setError('Account is already in use')
  }
  return setError(error.code)
  }
  
export const login = async (email, password,setLoading,setError,setNameInitialsArr) => {
    setLoading(true)
    try{
  
       await signInWithEmailAndPassword(auth, email, password).then((user) => {
         localStorage.setItem('username', [user.user.displayName])
         setNameInitialsArr(user.user.displayName.split(' '))
         setLoading(false)
          window.location.replace(window.location.origin); 
      })
    } catch (error) {
      setLoading(false)
      showError(error,setError)
    }
  }
 export const signup = async (name,email,password,confirm,setLoading,setError,setNameInitialsArr) => {
    if (name && email && password && confirm) {
      if (password == confirm) {
        setLoading(true)
    try{
          await createUserWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
            displayName:name ,
            }).then(() => {
              localStorage.setItem('username', [auth.currentUser?.displayName])
              setNameInitialsArr(auth.currentUser?.displayName?.split(' '))
                // console.log(user)
              setLoading(false)
                window.location.replace(window.location.origin); 
            })
            
          });
    } catch (error) {
      setLoading(false)
      showError(error,setError)
    }
  }
  }
}
export const handleGoogleAuth = (navigate) => {
  console.log('go')
  navigate('/');
  signInWithRedirect(auth, new GoogleAuthProvider());
  }
   
    

 export const uploadImage = (setOpenLogout,setLoading) => {
         let inputFile = document.getElementById('input-img-file');
        let profileName = document.getElementById('image_profileName');
        let imgContainer = document.getElementById('image_contanier');
        
        setLoading(true)
        inputFile.onchange = () => {
            const fileUrl = inputFile.files[0]; 
            const imageRef = ref(storage, `customerImages/${auth.currentUser.uid}`);
            uploadBytes(imageRef, fileUrl).then((snap) => {
                getDownloadURL(snap.ref).then((url) => {
                [...imgContainer.children].map((item) => {
                if (item.tagName === 'IMG' ) {
                    imgContainer.removeChild(item)
                }
                setOpenLogout(false);
                })
                profileName.classList.add('hidden')
                imgContainer.appendChild(
                    Object.assign(
                        document.createElement('img'),
                        {
                            src: url,
                            alt: 'profile_pic',
                            className:'w-full h-full rounded-full img userImg'
                        }
                     )
                 )
                  localStorage.setItem('userImg', url);
                  updateProfile(auth.currentUser, {
                  photoURL:url ,
                  })
                  setLoading(false);
                })
            })
            
        }
    }