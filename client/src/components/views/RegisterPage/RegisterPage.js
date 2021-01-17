import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHanlder = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHanlder = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHanlder = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // 버튼을 클릭하게되면 Refresh되는데, 이후 작업을 진행 할 수 없으므로 prventDefault를 사용함
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        console.log('Email', Email)
        console.log('Password', Password)

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push("/login")
            } else {
                alert("Failed to sign up")
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHanlder} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHanlder} />
                
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHanlder} />
                <br/>
                <button>
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
