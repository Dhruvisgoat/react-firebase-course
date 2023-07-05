import { auth, googleProvider } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../context/authContext.js';

//link css file
import './Auth.css';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('');
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                setCurrentUser(user);
            } else {
                // User is signed out
                setCurrentUser(null);
            }
        });
        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    const clearForm = () => {
        setEmail('');
        setPassword('');
    };

    const register = async () => {
        clearForm();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            setRegistrationMessage('Registration Successful ✅');
            if (!user.emailVerified) {
                await sendEmailVerification(auth.currentUser);
                setVerificationSent(true);
            }
        } catch (error) {
            setRegistrationMessage('Registration Failed ❌');
            console.log(error);
        }
    };
    const signInWithGoogle = async () => {
        try {
            clearForm();

            const { user } = await signInWithPopup(auth, googleProvider);
            setWhoIsSignedIn(`Signed in as ${user.email}`);
            setRegistrationMessage('Google Sign-in Successful ✅');
            if (!user.emailVerified) {
                await sendEmailVerification(auth.currentUser);
                setVerificationSent(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const signIn = async () => {
        try {
            clearForm();

            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            setRegistrationMessage('Sign-in Successful ✅');
            setWhoIsSignedIn(`Signed in as ${user.email}`);
            if (user && user.emailVerified) {
                setVerificationStatus('Email Verified ✅');
            } else {
                setVerificationStatus('Email Not Verified ❌');
            }

        } catch (error) {
            console.log(error);
        }
    };

    const signOutUser = async () => {
        try {
            setEmail('');
            setPassword('');

            await signOut(auth);
            setRegistrationMessage('');
            setVerificationSent(false);
            setVerificationStatus('');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Container">
            <div className="mb-3">
                <input
                    className="form-control"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary me-md-2 mb-2" onClick={register}>Register</button>
                <button className="btn btn-primary me-md-2 mb-2" onClick={signIn}>Sign In</button>
                <button className="btn btn-primary me-md-2 mb-2" onClick={signOutUser}>Sign Out</button>
                <button className="btn btn-danger me-md-2 mb-2" onClick={signInWithGoogle}>Sign In with Google</button>
            </div>
            <p className="message">{registrationMessage}</p>
            {verificationSent && <p className="email-sent">A verification email has been sent to your email address.</p>}
            <p className="email-verification">{verificationStatus}</p>
            {currentUser ? (
                <div>
                    <p>Welcome, {currentUser.email}!</p>
                </div>
            ) : (
                <p>No user is currently signed in.</p>
            )}
        </div>
    );

}

export default Auth;
