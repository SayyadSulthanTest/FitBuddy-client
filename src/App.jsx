import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import { HashRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import Home from './screens/home/Home.jsx';
import Profile from './screens/profile/Profile.jsx';
import CreateGroup from './screens/creategroup/CreateGroup.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './screens/profile/EditProfile.jsx';
import CreateChallenge from './screens/createchallenges/CreateChallenge.jsx';
import ShowMembers from './screens/privategroups/privategropmembernew.jsx';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateUser } from './slices/authSlice.js';
import PrivateGroup from './screens/privategroups/PrivateGroup.jsx';
import ComingSoon from './components/comingsoon/ComingSoon.jsx';
import Loading from './components/loading/Loading.jsx';

const ProtectedRoutes = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const checkAuthStatus = () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = jwtDecode(token);
                    const { name, email, pic, id } = userData;
                    dispatch(updateUser({ name, email, pic, id }));
                    dispatch(login());
                    setLoading(false);
                } else {
                    dispatch(logout()); // Logout if no token found
                    setLoading(false);
                }
            } catch (err) {
                console.log('Error in ProtectedRoutes:', err);
                dispatch(logout()); // Logout if decoding fails
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, [dispatch]); // Only run on mount to check auth status

    const auth = useSelector((state) => state.auth);

    if (auth.isLoggedIn) {
        return <Outlet />;
    } else if (loading) {
        return <Loading />;
    } else {
        return <Navigate to="/" />;
    }
};

const App = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (token) {
                const userData = jwtDecode(token);
                setUser(userData);
                dispatch(updateUser({ ...userData }));
                dispatch(login());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        setUser('');
        setLoading(false);
        dispatch(logout());
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Router>
                <Navbar logoutUser={handleLogout} />
                <ToastContainer position="bottom-center" />
                <div className="website-background">
                    <Routes>
                        <Route path="/editprofile" element={<EditProfile />} />
                        <Route path="/publicgroups" element={<ComingSoon />} />
                        <Route path="/profile" element={<ProtectedRoutes />}>
                            <Route path="/" element={<Profile />} />
                        </Route>
                        <Route path="/creategroup" element={<CreateGroup />} />
                        <Route path="/groups/:id/createchallenge" element={<CreateChallenge />} />
                        <Route path="/privategroup/:id/members" element={<ShowMembers />} />
                        <Route path="/privategroup/:id" element={<PrivateGroup />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
