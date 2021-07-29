import React from 'react'
import { useState } from 'react';
import './SignUpScreen.css'
import { auth } from '../firebase';
import {login, logout} from '../features/userSlice'
import { useRef } from 'react';
import {useDispatch} from 'react-redux';

function SignInScreen() {
    const emailRef = useRef(null); 
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const register = (e) => {
        e.preventDefault();
        if(!emailRef){
            return alert("Enter email and password to register");
        }
        else{
            auth.createUserWithEmailAndPassword(
                emailRef.current.value, 
                passwordRef.current.value)
            .then((userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                }));
            }).catch((error) => alert(error));
        }
    }
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value, 
            passwordRef.current.value)
        .then((userAuth) => {
            dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
        }))
        });    
    }
    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input type="email" ref={emailRef} placeholder="Email" />
                <input type="password" ref={passwordRef} placeholder="Password" />
                <button onClick={signIn} type="submit">Sign In</button>
                <h4>
                <span className="signUpScreen__gray">New to Netflix? </span>
                <span onClick={register} className="signUpScreen__link">Sign up now.</span> 
                </h4>
            </form>
        </div>
    )
}

export default SignInScreen
