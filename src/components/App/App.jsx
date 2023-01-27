import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const MainForm = lazy(() => import('../MainForm/MainForm'));
const RegistrationForm = lazy(() =>
  import('../RegistrationForm/RegistrationForm')
);

export const App = () => {
  const isUserRegistred = useSelector(state => state.user.token);

  return (
    <div>
      <Suspense fallback={<h1>Загрузка роутинг...</h1>}>
        <Routes>
          <Route
            path="/react-porjec/LoginForm"
            element={isUserRegistred ? <MainForm /> : <LoginForm />}
          />
          <Route
            path="/react-porject/MainForm"
            element={isUserRegistred ? <MainForm /> : <RegistrationForm />}
          />
          <Route
            path="*"
            element={isUserRegistred ? <MainForm /> : <RegistrationForm />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};
