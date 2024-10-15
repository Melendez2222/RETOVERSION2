import { useRef, useEffect } from 'react'
import './Login.css'
const Login = () => {
 
    const containerRef = useRef<HTMLDivElement>(null);
    const signInBtnRef = useRef<HTMLButtonElement>(null);
    const signUpBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const signInBtn = signInBtnRef.current;
        const signUpBtn = signUpBtnRef.current;
        if (!container || !signInBtn || !signUpBtn) return;
      
        const handleSignUp = () => {
            container.classList.add('sign-up-mode');
        };

        const handleSignIn = () => {
            container.classList.remove('sign-up-mode');
        };

        signUpBtn.addEventListener('click', handleSignUp);
        signInBtn.addEventListener('click', handleSignIn);

       
        return () => {
            signUpBtn.removeEventListener('click', handleSignUp);
            signInBtn.removeEventListener('click', handleSignIn);
        };
    }, []); 
    return (
        <div className="container-login" ref={containerRef}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
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
                        {/* <Link to='/Adminpanel'> */}
                            <input type="submit" className="btn" value="Sign up" />
                        {/* </Link> */}

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
    )
}

export default Login