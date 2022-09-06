import React, {useEffect, useState} from 'react';
import './App.css';
import PasswordConfig from "./components/passwordConfig";

const App = () => {
    const [password, setPassword] = useState('фыапфыа');
    const [passwordLength, setPasswordLength] = useState(10);
    const [includes, setIncludes] = useState('U');
    const [strength, setStrength] = useState('Weak');
    const [score, setScore] = useState(0);
    const string = "abcdefghijklmnopqrstuvwxyz"; //to upper
    const numeric = '0123456789';
    const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    useEffect(() => {
        let password = '';
        while (password.length < passwordLength) {
            if (includes.includes('U'))
                password += string.toUpperCase().charAt(Math.floor(Math.random() * string.length));
            if (includes.includes('L'))
                password += string.charAt(Math.floor(Math.random() * string.length));
            if (includes.includes('N'))
                password += numeric.charAt(Math.floor(Math.random() * numeric.length));
            if (includes.includes('S'))
                password += punctuation.charAt(Math.floor(Math.random() * punctuation.length));

            if (!includes) break;
        }
        setPassword(password);
    }, [includes, passwordLength]);
    useEffect(() => {
        let score = 0;
        let letters = [];
        for (let i = 0; i < password.length; i++) {
            letters[password[i]] = (letters[password[i]] || 0) + 1;
            score += 5.0 / letters[password[i]];
        }
        let variations = {
            digits: /\d/.test(password),
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            nonWords: /\W/.test(password),
        };
        let variationCount = 0;
        for (let check in variations) {
            variationCount += (variations[check] === true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;
        setScore(Math.floor(score));
    }, [password]);
    useEffect(() => {
        if (score > 90)
            setStrength('Strong');
        else if (score > 75)
            setStrength('Good');
        else if (score >= 30)
            setStrength('Weak');
    }, [score]);

    const changeIncludes = (char) => {
        if (includes.includes(char)) {
            setIncludes(includes.replace(char, ''));
        } else {
            setIncludes(includes + char);
        }
    };

    return (
        <div className={'flex flex-col text-stone-500 items-center'} style={{minWidth: 400}}>
            <h1 className={'text-lg'}>Password generator</h1>
            <div className={'flex flex-col text-stone-400 w-full'}>
                <div className={'bg-stone-700 p-4 mb-4'}>
                    {password}
                </div>
                <div className={'bg-stone-700 p-4'}>
                    <div className={'flex justify-between'}>
                        <span>Pass length</span>
                        <span>{passwordLength}</span>
                    </div>
                    <input className={'w-full'}
                           type="range"
                           min="6"
                           max="32"
                           step="1"
                           value={passwordLength}
                           onChange={(e) => setPasswordLength(e.target.value)}/>
                    <PasswordConfig changeIncludes={changeIncludes} inc={includes}/>
                    <div className={'flex bg-stone-900 p-4 mt-4 justify-between'}>
                        <span>Strength</span>
                        <div>
                            {score + ' ' + strength}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;