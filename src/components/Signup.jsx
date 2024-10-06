import React, { useState } from 'react';
import Header from './Header';
import Input from './Input';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import { toast } from 'react-toastify';
import { auth, provider } from '../finance';
import { useNavigate } from 'react-router-dom';
import {setDoc,doc, getDoc} from 'firebase/firestore';
import { db } from '../finance';
import { GoogleAuthProvider } from "firebase/auth";



function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false); 
  const navigate = useNavigate()

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
  
    const userRef = doc(db, "users", user.uid); 
    const userData = await getDoc(userRef);
  
    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();  
  
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account created!");
      } catch (error) {
        toast.error("Error creating user document: " + error.message);
      }
    } else {
      toast.error("User already exists!");
    }
  }


  function signUpWithEmail(event) {
    setLoading(true);
    event.preventDefault();
    if (name !== "" && email !== "" && password !== "" && confirm !== "") {
      if (password === confirm) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            createDoc(user);
            console.log("user:", user);
            toast.success("User created successfully!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirm("");
            navigate('/dashboard')
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Passwords do not match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function signInWithEmail(e){
      e.preventDefault();
      setLoading(true)
      if(email!="" && password!=""){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Logged In successfully!")
          setEmail("")
          setPassword("")
          navigate('/dashboard')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)
        });
      }
      else{
        toast.error("All feilds are mandatory!")
        setLoading(false)
      }
  }

  const toggleForm = () => {
    setLogin(!login);
  };

  function googleAuth(e){
    e.preventDefault()
    signInWithPopup(auth, provider)
    .then((result) => {
      
      const credential = provider.credentialFromResult(result);
      const token = credential.accessToken;
      
      const user = result.user;
      
    }).catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
     
      const email = error.customData.email;
      
      const credential = GoogleAuthProvider.credentialFromError(error);
      
    });
  }

  return (
    <div>
      <Header />
      {login ? (
        <div className='flex justify-center items-center bg-white shadow-xl flex-col mx-auto w-96 h-auto align-middle mt-28 rounded-md p-6'>
          <h2 className='text-gray-400 mb-4 text-lg'>
            Sign In to <span className='text-blue-400'>Wallet</span>
          </h2>
          <form className='space-y-4'>
            <Input
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="example@gmail.com"
              type="email"
            />
            <Input
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="password"
              type="password"
            />
            <div className='space-y-2'>
              <button
                className="border text-black py-1 w-full hover:bg-blue-500 border-blue-300 rounded-sm"
                onClick={signInWithEmail}
              >
                Sign In with email
              </button>
              <p className='flex items-center justify-center text-gray-400'>or</p>
              <button className='bg-blue-400 text-black py-1 w-full hover:bg-blue-500 rounded-sm'
              onClick={googleAuth}>
                Continue with Google
              </button>
            </div>
          </form>
          <p className='mt-4 text-sm text-gray-500'>
            Don't have an account?{" "}
            <span className='text-blue-500 cursor-pointer' onClick={toggleForm}>
              Sign Up
            </span>
          </p>
        </div>
      ) : (
        <div className='flex justify-center items-center bg-white shadow-xl flex-col mx-auto w-96 h-auto align-middle mt-28 rounded-md p-6'>
          <h2 className='text-gray-400 mb-4 text-lg'>
            Sign up to <span className='text-blue-400'>Wallet</span>
          </h2>
          <form className='space-y-4'>
            <Input
              label="Full Name"
              state={name}
              setState={setName}
              placeholder="Enter name"
              type="text"
            />
            <Input
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="example@gmail.com"
              type="email"
            />
            <Input
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="password"
              type="password"
            />
            <Input
              label="Confirm password"
              state={confirm}
              setState={setConfirm}
              placeholder="confirm password"
              type="password"
            />
            <div className='space-y-2'>
              <button
                className="border text-black py-1 w-full hover:bg-blue-500 border-blue-300 rounded-sm"
                onClick={signUpWithEmail}
              >
                Sign up with email
              </button>
              <p className='flex items-center justify-center text-gray-400'>or</p>
              <button className='bg-blue-400 text-black py-1 w-full hover:bg-blue-500 rounded-sm'
              onClick={googleAuth}>
                Continue with Google
              </button>
            </div>
          </form>
          <p className='mt-4 text-sm text-gray-500'>
            Already have an account?{" "}
            <span className='text-blue-500 cursor-pointer' onClick={toggleForm}>
              Sign In
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
