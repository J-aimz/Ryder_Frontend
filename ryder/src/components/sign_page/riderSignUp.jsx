import React, {useState} from 'react';
import "../../styles/signUp.css";
import axios from 'axios';
import SignUpBanner from '../../images/RyderImg.svg';
import RyderLogo from '../../images/Ryder-Logo.svg';

function RiderSignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [bikeDocument, setBikeDocument] = useState('');
    const [validID, setValidID] = useState('');
    const [passport, setPassport] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const isPasswordValid = passwordRegex.test(password);
    const isEmailValid = emailRegex.test(email);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
  
        try {
            
            if (!isEmailValid) {
                setError('Please enter a valid email address.');
                setSuccessMessage('');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setSuccessMessage('');
                return;
            }
  
            if (!isPasswordValid) {
                setError('Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
                setSuccessMessage('');
                return;
            }
           
            const response = await axios.post('http://', {
                firstName,
                lastName,
                phoneNumber,
                email,
                city,
                bikeDocument,
                validID,
                passport,
                password,
            });
  
            function sendOTP() {
            axios
                .post('http://', { email: email })
                .then(response => {
                console.log('OTP Sent:', response.data);
                })
                .catch(error => {
                console.error('Error sending OTP:', error);
                });
            };
  
            // Handle the response here, e.g., show a success message to the user.
            console.log(response.data);
            if (!response.data.succeeded) {
                 setSuccessMessage('');
                setError(response.data.data);
                // Display the error message 
            }
            else {
                setError(''); // Clear any previous error
                setSuccessMessage(response.data.data);
                localStorage.setItem('email', email);
                sendOTP();
                //navigate("/opt-verification");
            }
            // Clear input fields after successful registration
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setEmail('');
            setCity('');
            setBikeDocument('');
            setValidID('');
            setPassport('');
            setPassword('');
            setConfirmPassword('');
            setError('');
        }
        catch (error) {
            if (error.response) {
                setSuccessMessage('');
                setError(error.response.data.data);  
            }
            else {
                console.error(error);
                setError('An error occurred during Rigistration');
            }
        }
        finally
        {
            setLoading(false);
        }
    };
  return (
    <>
        <div className="wrapper row">
            <div className="holder col-md-12">
                <div className="left col-md-6">
                    <img src={SignUpBanner} alt="" srcset="" height={1000}/>
                </div>
                <div className="right col-md-5">
                    <div className="content">
                        <div className="logoholder mt-6"> <img src={RyderLogo} alt="" srcset="" /></div>

                        <form action="" method="post" className='elements'>
                            <h2 className='SignUp-H4 mt-4'>Sign Up as a Rider</h2>
                            <div className="form-holder col-md-8">
                                <label className='mt-4'><b>First Name</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="form-control mt-1"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Last Name</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="form-control mt-1"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Phone Number</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    className="form-control mt-1"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Email Address</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter your email address"
                                    className="form-control mt-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>City</b></label>
                                <select name="" id="" 
                                    className='form-control' 
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">Select a City</option>
                                    <option value="">Lagos</option>
                                    <option value="">Benue</option>
                                    <option value="">Abuja</option>
                                    <option value="">Portharcort</option>
                                </select>
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Bike Documents</b></label>
                                <input type="file" name="bikeDocument" 
                                className='form-control mt-1' 
                                value={bikeDocument}
                                onChange={(e) => setBikeDocument(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Valid Id Card</b></label>
                                <input type="file" name="validIdCard" 
                                className='form-control mt-1' 
                                value={validID}
                                onChange={(e) => setValidID(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Passport Photo</b></label>
                                <input type="file" name="PassportPhoto" 
                                className='form-control mt-1' 
                                value={passport}
                                onChange={(e) => setPassport(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Password</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter your password"
                                    className="form-control mt-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-holder col-md-8">
                                <label className='mt-2'><b>Confirm Password</b></label>
                                <input
                                    type="text"
                                    placeholder="Confirm your password"
                                    className="form-control mt-1"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {/* Display error message */}
                            {error && <div className="form-holder" style={{ color: 'red', textAlign: 'center' }}>
                                <small><b>{error}</b></small>
                            </div>}
                            {/* Display success message */}
                            {successMessage && <div className="form-holder" style={{ color: 'green', textAlign: 'center' }}>
                                <small><b>{successMessage}</b></small>
                            </div>}
                            {/* Display loading spinner */}
                            {loading && <div className="form-holder" style={{ textAlign: 'center' }}>
                                <small>Loading...</small>
                            </div>}

                            <div className="form-holder col-md-8" >
                                <button
                                    className="submitting"
                                    type="submit"
                                    onClick={handleRegister}
                                    disabled={!isPasswordValid} // Disable button if password is not a match
                                > Sign Up </button>
                            </div>
                            <div className="form-holder mt-2" style={{ textAlign: 'left' }}>
                                <label>
                                    <p> Already have an account? <a href="/address">SignIn</a></p>
                                </label>
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RiderSignUp;

