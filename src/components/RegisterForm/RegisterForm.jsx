import { Notify } from 'notiflix';
import { useAuth } from 'components/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import css from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => Notify.success('Ви зареєстровані. Ласкаво просимо!'))
      .catch(() => Notify.failure('Такий користувач вже існує!'));

    form.reset();
  };

  return (
    <>
      {isLoading && <p>Registrations...</p>}
      <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
        <label className={css.label}>
          Username
          <input type="text" name="name" />
        </label>
        <label className={css.label}>
          Email
          <input type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};