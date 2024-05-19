import React from 'react';
import './RegisterLogin.css';
import { Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'

function RegisterLogin() {
    const navigate = useNavigate();

    const registerClick = () => {
        navigate('/register');
    }

    const loginClick = () => {
        navigate('/login');
    }

    const handleType = (count) => {
        // access word count number
        console.log(count);
    }
    
    const handleDone = () => {
        console.log(`Done after 5 loops!`);
    }

    return (
        <div className="register-login-container">
            <h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}>
                Welcome to{' '}
                <span style={{ color: 'orange', fontWeight: 'bold' }}>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        words={['Ten Thousand Hours']}
                        loop={5}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        onLoopDone={handleDone}
                        onType={handleType}
                    />
                </span>
            </h1>
            <h2>A platform to put in the ten thousand hours needed to improve your logic and coding skills. We make learning simple and fun!</h2>
            <Button onClick={registerClick} id='reg'>Register</Button>
            <Button onClick={loginClick} id='log'>Login</Button>
        </div>
    );
}

export default RegisterLogin;