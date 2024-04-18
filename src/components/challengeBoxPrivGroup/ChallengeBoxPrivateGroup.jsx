import React, { useEffect, useState } from 'react';
import DateCalendarServerRequest from '../Calender/DateCalender';
import { useNavigate } from 'react-router-dom';
import { AutoAwesome } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL;
const ChallengeBoxPrivateGroup = ({ showCalender, id }) => {
    const history = useNavigate();
    const [challenges, setChallenges] = useState([]);
    const [progress, setProgress] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const user = useSelector((state) => state.auth);
    // console.log(challenges);

    const getChallenges = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get(`${API_URL}/challenges/${id}`, config);
            // console.log(data);
            data.data.forEach((challenge) => {
                challenge.progress.forEach((userProgress) => {
                    if (userProgress.user._id === user.id) {
                        challenge.joined = true;
                    }

                    if (!challenge.joined) challenge.joined = false;
                });
            });
            setChallenges(data.data);
        } catch (err) {
            // console.log(err);
            toast.error(err.message);
        }
    };
    useEffect(() => {
        getChallenges();
    }, []);

    const handleJoinChallenge = async (challengeId) => {
        // console.log('user', user);
        // console.log('chelllenge', challengeId);
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const body = {
            users: [],
        };
        body.users.push(user.id);
        try {
            const { data } = await axios.post(
                `${API_URL}/challenges/${challengeId}/members`,
                body,
                config
            );
            // console.log(data);
            // const index = challenges.findIndex((val) => val._id === challengeId);

            // if (index !== -1) {
            //     setChallenges(
            //         challenges.map((challenge, i) => {
            //             if (i === index) {
            //                 challenge.joined = true;
            //             }
            //             return challenge;
            //         })
            //     );
            // } else {
            //     toast.error('challlenge not found!!');
            // }

            getChallenges();
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    const handleShowProgress = (challengeId) => {
        const index = challenges.findIndex((val) => val._id === challengeId);
        const progressData = challenges[index].progress;
        const progressIndex = progressData.findIndex((val) => val.user._id === user.id);

        setProgress(progressData[progressIndex]);
        setSelectedChallenge(challenges[index]);
    };

    const handleUpdateProgress = async (challengeId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        // Get the current date
        const currentDate = new Date();

        // Subtract one day from the current date
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - 1);

        // Convert the previous date to ISO string
        const previousDateISOString = previousDate.toISOString();
        const body = {
            // date: new Date().toISOString().split('T')[0],
            date: previousDateISOString.split('T')[0],
            completed: true,
        };
        try {
            const response = await axios.put(
                `${API_URL}/challenges/${challengeId}/progress/`,
                body,
                config
            );
            console.log('Progress updated Response: ', response.data);

            // re calling api

            const { data } = await axios.get(`${API_URL}/challenges/${id}`, config);
            console.log(data);
            data.data.forEach((challenge) => {
                challenge.progress.forEach((userProgress) => {
                    if (userProgress.user._id === user.id) {
                        challenge.joined = true;
                    }

                    if (!challenge.joined) challenge.joined = false;
                });
            });
            setChallenges(data.data);

            handleShowProgress(challengeId);
            // const index = challenges.findIndex((val) => val._id === challengeId);
            // const progressData = challenges[index].progress;
            // const progressIndex = progressData.findIndex((val) => val.user._id === user.id);

            // setProgress(progressData[progressIndex]);
            // setSelectedChallenge(challenges[index]);

            toast('Progress Updated..');
        } catch (err) {
            // console.log(err);
            toast.error('Failed to Update Progress!!');
        }
    };

    const getDateShow = (date) => {
        // Get the current date
        const currentDate = new Date(date);

        // Subtract one day from the current date
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() + 1);

        // Convert the previous date to ISO string
        const previousDateISOString = previousDate.toISOString();
        return previousDateISOString.split('T')[0];
    };

    return (
        <div
            className="left-side"
            style={{
                width: '60%',
                padding: showCalender ? '24px 5px 24px 24px' : '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4vh',
                justifyContent: 'space-around',
                // border: '2px solid white',
                height: '90vh',
            }}
        >
            <div
                className="box calendar"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                    height: '60%',
                }}
            >
                {selectedChallenge && (
                    <>
                        <h2>{selectedChallenge && selectedChallenge.name}</h2>
                        {/* <h2>Fitness Group Challenge</h2> */}
                        <div
                            style={{
                                flexGrow: 1,
                                border: '2px solid white',
                                background: 'white',
                            }}
                        >
                            <DateCalendarServerRequest
                                progress={progress}
                                challenge={selectedChallenge}
                            />
                        </div>
                    </>
                )}
                {/* <div className="duration">Duration: 1st April - 21st April</div>
              <div className="progress-slider"></div> */}
            </div>
            <div
                className="box challenges"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    height: '30%',
                }}
            >
                <h2>
                    Challenges{' '}
                    <button
                        className="add-challenge-btn"
                        onClick={() => history(`/groups/${id}/createchallenge`)}
                    >
                        +
                    </button>
                </h2>
                <div style={{ height: '80%', overflowY: 'auto' }}>
                    {challenges.map((challenge) => (
                        <div
                            key={challenge._id}
                            className="challenge"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                paddingBottom: '8px',
                                borderBottom: '2px solid white',
                                marginBottom: '6px',
                            }}
                        >
                            <h3
                                onClick={() =>
                                    challenge.joined && handleShowProgress(challenge._id)
                                }
                            >
                                Challenge Name: {challenge.name}
                            </h3>
                            <p>
                                {' '}
                                Duration:
                                {getDateShow(challenge.startDate)} -{' '}
                                {getDateShow(challenge.endDate)}
                            </p>
                            {/* <p>
                                {' '}
                                Duration:
                                {challenge.startDate.split('T')[0]} -{' '}
                                {challenge.endDate.split('T')[0]}
                            </p> */}
                            {/* <p>Today's Update: 50% completed</p> */}
                            {challenge.joined && (
                                <button
                                    className="update-status-btn"
                                    style={{
                                        alignSelf: 'center',
                                        padding: '2px 10px',
                                        backgroundColor: 'green',
                                        borderRadius: '10px',
                                        transition: 'box-shadow 0.3s ease', // Adding transition for smooth effect
                                        boxShadow: 'none', // Initial state without box shadow
                                        ':hover': {
                                            // Pseudo-class for hover effect
                                            boxShadow: '2px 2px 5px white', // Box shadow on hover
                                        },
                                    }}
                                    onClick={() => handleUpdateProgress(challenge._id)}
                                >
                                    Update Status
                                </button>
                            )}

                            <button onClick={() => handleJoinChallenge(challenge._id)}>
                                {!challenge.joined && 'join'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengeBoxPrivateGroup;
