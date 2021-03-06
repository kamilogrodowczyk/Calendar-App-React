import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button } from 'components/organisms/Modal/InputModal.styles';
import axios from 'axios';
import { BASE_API_URL } from 'data/baseUrl';
import MainWrapper from 'components/templates/MainTemplate';
import { InputErrorWrapper, FormWrapper } from 'components/templates/MainTemplate.styles';
import { CompanyContext } from 'providers/CompanyProvider';
import { ErrorParagraph } from 'components/atoms/Paragraph.styles';

const RegisterWrapper = styled(FormWrapper)`
  width: 400px;
  height: 60%;
`;

const RegisterInput = styled(Input)`
  width: 80%;
  border: solid 1px rgba(255, 255, 255, 1);
`;

const LinkedElement = styled(Link)`
  color: black;
`;

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isPending, setPendingState] = useState(false);
  const { company } = useContext(CompanyContext);
  const localStorageToken = localStorage.getItem('auth-token');

  const onSubmit = async (data) => {
    setPendingState(true);
    try {
      await axios.post(`${BASE_API_URL}/register`, {
        ...data,
      });
      setPendingState(false);
    } catch (error) {
      if (error.response) {
        console.log('error', error.response.data);
      }
    }
    reset();
  };
  console.log(company);
  return (
    <MainWrapper>
      <RegisterWrapper as="form" onSubmit={handleSubmit(onSubmit)}>
        <select {...register('company')}>
          <option key="admin" value="admin">
            admin
          </option>
          {company.map((element) => (
            <option key={element.company} value={element.company.toLowerCase().replace(/\s/g, '')}>
              {element.company}
            </option>
          ))}
        </select>
        <InputErrorWrapper>
          <RegisterInput
            {...register('firstName', {
              required: 'Imi?? jest wymagane',
              pattern: {
                value: /^[A-Za-z????????????????????????????????????]+$/i,
                message: 'Imi?? musi zawiera?? tylko litery a-z oraz A-Z',
              },
            })}
            placeholder="Imi??"
          />
          {errors.firstName && <ErrorParagraph isVisible>{errors.firstName.message}</ErrorParagraph>}
        </InputErrorWrapper>
        <InputErrorWrapper>
          <RegisterInput
            {...register('lastName', {
              required: 'Nazwisko jest wymagane',
              pattern: {
                value: /^[A-Za-z????????????????????????????????????]+$/i,
                message: 'Nazwisko musi zawiera?? tylko litery a-z oraz A-Z',
              },
            })}
            placeholder="Nazwisko"
          />
          {errors.lastName && <ErrorParagraph isVisible>{errors.lastName.message}</ErrorParagraph>}
        </InputErrorWrapper>
        <InputErrorWrapper>
          <RegisterInput
            {...register('email', {
              required: 'Email jest wymagany',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email nie jest prawid??owy',
              },
            })}
            placeholder="Email"
          />
          {errors.email && <ErrorParagraph isVisible>{errors.email.message}</ErrorParagraph>}
        </InputErrorWrapper>
        <InputErrorWrapper>
          <RegisterInput
            type="password"
            {...register('password', {
              required: 'Has??o jest wymagane',
              minLength: {
                value: 6,
                message: 'Has??o musi zawiera?? minimum 6 znak??w',
              },
            })}
            placeholder="Has??o"
          />
          {errors.password && <ErrorParagraph isVisible>{errors.password.message}</ErrorParagraph>}
        </InputErrorWrapper>
        {!isPending && <Button isBlack>Zarejestruj</Button>}
        {isPending && <Button disabled>Rejestrowanie</Button>}
        {localStorageToken ? (
          <LinkedElement to={`/admin/dashboard`}>Wr???? do dashboardu</LinkedElement>
        ) : (
          <LinkedElement to={`/admin/login`}>Wr???? do logowania</LinkedElement>
        )}
      </RegisterWrapper>
    </MainWrapper>
  );
};

export default Register;
