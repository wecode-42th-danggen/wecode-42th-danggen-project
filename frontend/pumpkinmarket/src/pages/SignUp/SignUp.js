import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../Login/Login';

function SignUpForm() {
  const [signupInfo, setSignupInfo] = useState('');
  const [imgFile, setImgFile] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleNickNameChange = e => setNickName(e.target.value);
  const handlePhoneNumberChange = e => setPhoneNumber(e.target.value);

  const navigate = useNavigate;

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://192.168.219.104:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: '',
      },
      body: JSON.stringify({
        phoneNumber: signupInfo.phoneNumber,
        nickName: signupInfo.nickName,
        email: signupInfo.email,
        password: signupInfo.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(signupInfo);
        navigate('/');
      });
  };

  const waringEmail = () => {
    if (
      regexEmail.test(signupInfo.email) === false &&
      signupInfo.email.length > 0
    ) {
      return '이메일 형식이 올바르지 않습니다.';
    } else if (regexEmail.test(signupInfo.email) === true) {
      return '형식에 맞는 이메일주소 입니다.';
    } else if (signupInfo.email.length === 0) {
      return null;
    }
  };

  const regexEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <p
          className={
            regexEmail.test(signupInfo.email) === false
              ? 'text-red-600'
              : 'text-green-500'
          }
        >
          {waringEmail()}
        </p>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="NickName">nickName</label>
        <input
          type="text"
          id="confirmNickName"
          value={nickName}
          onChange={handleNickNameChange}
        />
      </div>
      <div>
        <label htmlFor="Password">phonePhoneNumber</label>
        <input
          type="text"
          id="PhoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        signUp
      </button>
    </form>
  );
}

export default SignUpForm;
