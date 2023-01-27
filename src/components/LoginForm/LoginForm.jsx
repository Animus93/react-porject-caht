import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserLoggedInMutation } from 'redux/userHerokuappApi';
import {
  useGetUsersQuery,
  useUserOnlineMutation,
} from 'redux/usersApiMockapi';
import styles from './LoginForm.module.css';
//Объединить  компонентом RegistrationForm??
const LoginForm = () => {
  const navigate = useNavigate();
  const isUserRegistred = useSelector(state => state.user.key);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [userLogged, {isLoading }] = useUserLoggedInMutation();
  const { data: users } = useGetUsersQuery();
  const [online] = useUserOnlineMutation();

  const onUpdateState = event => {
    const dataValue = event.currentTarget.value || '';
    const dataName = event.currentTarget.name || '';
    setUserData(prev => ({ ...prev, [dataName]: dataValue }));
  };

  useEffect(() => {
    navigation();
  });

  const navigation = () => {
    if (isUserRegistred) {
      navigate('/react-porject/MainForm');
    }
  };

  const isUserExist = async e => {
    e.preventDefault();
    let currentId = null;
    try {
      const response = await userLogged(userData).unwrap();
      users.forEach(current => {
        if (current.user.email === response.user.email) {
          return (currentId = current.id);
        }
      });
      if (currentId) {
        online(currentId);
        return;
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      alert('Неверный логин или пароль');
    }
    navigation();
  };

  return (
    <>
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <form className={styles.RegistrationForm} onSubmit={isUserExist}>
          <h2>Войти</h2>
          <input
            placeholder="почта"
            onChange={onUpdateState}
            value={userData.email || ''}
            name="email"
            required
          />
          <input
            placeholder="пароль"
            onChange={onUpdateState}
            value={userData.password || ''}
            name="password"
            required
          />
          <button className={styles.submit} type="submit">
            Войти
          </button>
          <NavLink
            className={styles.link}
            to={'/react-porject/RegistrationForm'}
          >
            Зарегистрироваться
          </NavLink>
        </form>
      )}
    </>
  );
};

export default LoginForm;
