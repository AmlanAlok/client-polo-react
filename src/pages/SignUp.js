import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export default function SignUp() {

    const userRef = useRef()    // puts focus on user input when the component loads
    const errRef = useRef()     // if error occurs then it can announce the error for accessability

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdfocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    // This will set focus on the username when the component loads. 
    // There is nothing in the dependency array
    useEffect(() => {
        userRef.current.focus()
    }, [])

    // check if the username is valid as per the regex
    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    // check if password is valid as per regex and if both password match
    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    // remove any error msg if user is entering any data
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    return (
        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                {errMsg}
            </p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                </label>
                <input type="text"
                    id='username'       // should match htmlFor in the label
                    ref={userRef}       // sets focus on the input
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}   // ties the input to user state
                    required
                    aria-onInvalid={validName ? 'false' : 'true'}   // Accessible Rich Internet Applications ( ARIA )
                    aria-describedby='uidnote'                      // This value be read by a screen-reader
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
            </form>
        </div>
    )
}
