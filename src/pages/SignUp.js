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
    const [pwdFocus, setPwdFocus] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2){
            setErrMsg('Invalid Entry')
            return
        }
        console.log(user, pwd)
        setSuccess(true)
    }

    return (
        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                {errMsg}
            </p>
            <h1>Register</h1>
            
            <form onSubmit={handleSubmit}>

                {/* ==================== USERNAME ======================= */}

                <label htmlFor="username">
                    Username:
                    <span className={validName ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input type="text"
                    id='username'       // should match htmlFor in the label
                    ref={userRef}       // sets focus on the input
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}   // ties the input to user state
                    value={user}
                    required
                    aria-onInvalid={validName ? 'false' : 'true'}   // Accessible Rich Internet Applications ( ARIA )
                    aria-describedby='uidnote'                      // This value be read by a screen-reader
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                {/* This will display only if:
                1. username is on focus
                2. user state is not empty
                3. username validity is false */}
                <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. <br />
                    Must begin with a letter <br />
                    Letters, numbers, underscores, hypens allowed.
                </p>


                {/* ==================== PASSWORD ======================= */}

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>

                <input type="password"
                    id='password'       // should match htmlFor in the label
                    onChange={(e) => setPwd(e.target.value)}   // ties the input to user state
                    value={pwd}
                    required
                    aria-onInvalid={validPwd ? 'false' : 'true'}   // Accessible Rich Internet Applications ( ARIA )
                    aria-describedby='pwdnote'                      // This value be read by a screen-reader
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                {/* This will display only if:
                1. pwd is on focus
                2. pwd validity is false */}
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>

                {/* ==================== CONFIRM PASSWORD ======================= */}

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>

                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />

                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                {/* You do not have to add type='submit' when there is only one button on the form */}
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

            </form>

            <p>
                Already registered?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </div>
    )
}
