import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const RequireAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center mt-5'>
            <h3 className='text-red-500 font-bold'>Your Email is not verified!!</h3>
            <br />
            <h5 className='text-green-500 font-extrabold'> Please Verify your email address</h5>
            <br />
            <button
            className='btn btn-red-500'
                onClick={async () => {
                    await sendEmailVerification();
                    // toast('Email Sent ...');
                }}
            >
              Varify Your Email
            </button>
        </div>
    }
    return children;
};

export default RequireAuth;