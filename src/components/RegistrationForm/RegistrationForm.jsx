import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserSignupMutation } from 'redux/userHerokuappApi';
import { useAddUserMutation } from 'redux/usersApiMockapi';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const isUserRegistred = useSelector(state => state.user.key);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    id: '',
    token: '',
  });
  const [userSignup, { isLoading }] = useUserSignupMutation();
  const [addUser] = useAddUserMutation();

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

  const addNewUser = async e => {
    e.preventDefault();
    try {
      const response = await userSignup(userData).unwrap();
      await addUser({...response, isOnline: true}).unwrap();
    } catch (err) {
      console.log(err);
      if (err.data.message) {
        if (err.data.message.includes('length')) {
          return alert('Пароль должен быть не менее 7 символов');
        }
        alert(err.data.message);
      } else {
        alert('Такой Email уже зарегистрирован');
      }
    }
    navigation();
  };

  return (
    <>
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <form className={styles.RegistrationForm} onSubmit={addNewUser}>
          <h2>Регистрация</h2>
          <input
            placeholder="ник"
            onChange={onUpdateState}
            value={userData.name || ''}
            name="name"
            required
          />
          <input
            placeholder="почта"
            onChange={onUpdateState}
            value={userData.email || ''}
            name="email"
            required
          />
          <input
            placeholder="пароль (от 7 символов)"
            onChange={onUpdateState}
            value={userData.password || ''}
            name="password"
            required
          />
          <button className={styles.submit} type="submit">
            Зарегистрироваться
          </button>
          <NavLink className={styles.link} to={'/react-porjec/LoginForm'}>
            Уже есть аккаунт?
          </NavLink>
        </form>
      )}
    </>
  );
};

export default RegistrationForm;
