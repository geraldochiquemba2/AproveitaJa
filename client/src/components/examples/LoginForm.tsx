import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted">
      <LoginForm
        onLogin={(phone, password) => console.log('Login:', phone, password)}
        onSwitchToRegister={() => console.log('Switch to register')}
      />
    </div>
  );
}
