import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';
import { Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'components/hooks/useAuth';
import { logIn } from 'redux/auth/operations';
import { StyledButton, StyledErrorContainer, StyledForm, StyledSection } from './LoginForm.styled';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAuth();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => Notify.success('Ласкаво просимо!'))
      .catch(() => Notify.failure('Неіснуючий email або пароль'));
    resetForm();
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .max(25, 'Не більше 25 символів')
      .trim()
      .required('Потрібно заповнити поле'),
    password: Yup.string()
      .max(15, 'Не більше 15 символів')
      .required('Потрібно заповнити поле'),
  });

  return (
    <StyledSection>
      {isLoading && <p>Loging...</p>}
      <Formik 
      initialValues={initialValues} 
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      >
        <StyledForm autoComplete="off">
          <label >
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component={StyledErrorContainer} />
          </label>
          <label >
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" component={StyledErrorContainer} />
          </label>
          <StyledButton type="submit">Log In</StyledButton>
        </StyledForm>
      </Formik>
    </StyledSection>
  );
};
