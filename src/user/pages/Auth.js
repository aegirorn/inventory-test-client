import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ApiHelper from '../../api-helper'
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [headerCaption, setHeaderCaption] = useState('Login');

  const apiHelper = new ApiHelper();

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: '',
        isValid: false
        },
      email: {
        value: '',
        isValid: true
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: undefined
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
      setHeaderCaption('Login');
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: '',
            isValid: false
          }
        }, false);
      setHeaderCaption('Register New User');
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);

    let token = '';

    if (isLoginMode) {
      token = await apiHelper.login(formState.inputs.username.value, formState.inputs.password.value);
    } else {
      token = await apiHelper.register(formState.inputs.username.value, formState.inputs.password.value, formState.inputs.email.value);
    }

    auth.login(token);

  };

  return (
    <Card className="authentication">
      <h2>{headerCaption}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
      {!isLoginMode && (
          <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="username"
          type="text"
          label="User name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a user name."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(4)]}
          errorText="Please enter a valid password, at least 4 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
