import { Dialog, DialogContent } from '@mui/material';
import { useRef, useEffect, useState } from 'react'
import './Login.css'
import { LoginModalProps } from './Interfaces';
import { LoginUsers } from '../../services/Request';
import { useNavigate } from 'react-router-dom';

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate();
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await LoginUsers(username, password);
            if(response===200){
                onLoginSuccess?.();
                onClose();
                navigate('/AdmPanel');
                
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }

    };
    // Referencias para los botones y contenedor
    const containerRef = useRef<HTMLDivElement>(null);
    const signInBtnRef = useRef<HTMLButtonElement>(null);
    const signUpBtnRef = useRef<HTMLButtonElement>(null);

    // useEffect para manejar los eventos cuando el componsente se monta
    useEffect(() => {
        const container = containerRef.current;
        const signInBtn = signInBtnRef.current;
        const signUpBtn = signUpBtnRef.current;
        if (!container || !signInBtn || !signUpBtn) return;
        // Funciones para agregar y quitar la clase
        const handleSignUp = () => {
            container.classList.add('sign-up-mode');
        };

        const handleSignIn = () => {
            container.classList.remove('sign-up-mode');
        };

        // Añadir los event listeners
        signUpBtn.addEventListener('click', handleSignUp);
        signInBtn.addEventListener('click', handleSignIn);

        // Limpiar los event listeners cuando el componente se desmonta
        return () => {
            signUpBtn.removeEventListener('click', handleSignUp);
            signInBtn.removeEventListener('click', handleSignIn);
        };
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez

    return (
        <Dialog open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                width: '80%',
                maxWidth: 'none'
            },
            '& .MuiDialogContent-root': {
                padding: 0
            }
        }}>
            <DialogContent>
                <div className="container-login" ref={containerRef}>
                    <div className="forms-container">
                        <div className="signin-signup">
                            <form action="#" className="sign-in-form" onSubmit={handleLogin}>
                                <h2 className="title">Sign in</h2>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <input type="submit" value="Login" className="btn solid" />

                            </form>
                            <form action="#" className="sign-up-form">
                                <h2 className="title">Sign up</h2>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="RUC O DNI" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="NOMBRE" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="DIRECCION" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="CORREO" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Username" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Password" />
                                </div>
                                <input type="submit" className="btn" value="Sign up" />

                            </form>
                        </div>
                    </div>

                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>New here ?</h3>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
                                <button className="btn transparent" id="sign-up-btn" ref={signUpBtnRef}>
                                    Sign up
                                </button>
                            </div>
                            <img src="images/log.svg" className="image" alt="" />
                        </div>
                        <div className="panel right-panel">
                            <div className="content">
                                <h3>One of us ?</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
                                <button className="btn transparent" id="sign-in-btn" ref={signInBtnRef}>
                                    Sign in
                                </button>
                            </div>
                            <img src="images/register.svg" className="image" alt="" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal