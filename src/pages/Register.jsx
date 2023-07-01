import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import { Helmet } from 'react-helmet';

export default function RegisterPage() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
}
