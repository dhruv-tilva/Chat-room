import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';
import { getTokenFromCookie } from '../../utils';

function AuthenticatedApp() {
    const token = getTokenFromCookie()

    const PrivateRoom = () => {
        return token ? <ChatRoom /> : <Navigate to="/" />
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/room/:id" element={<PrivateRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
