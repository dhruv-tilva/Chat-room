
import './styles.css';
import { loginWithGoogle } from '../../services/firebase';

function UnauthenticatedApp() {

    const login  = async () => {
        await loginWithGoogle()
        window.location.reload()
    }

    return (
        <>
            <h2>Log in to join a chat room!</h2>
            <div>
                <button onClick={login} className="login">
                    Login with Google
                </button>
            </div>
        </>
    );
}

export { UnauthenticatedApp };
