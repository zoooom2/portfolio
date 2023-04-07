import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useUserContext } from '../context/user_context';

const tempDetails = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};
const Signup = () => {
  const [details, setDetails] = useState({
    ...tempDetails,
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name !== 'email') {
      if (e.target.value === '') {
        e.target.style.border = '1px solid red';
      } else {
        e.target.style.border = 'none';
      }
    }
    if (name === 'email') {
      /^[A-Z0-9. _%+-]+@[A-Z0-9. -]+\.[A-Z]{2,4}$/i.test(e.target.value)
        ? (e.target.style.border = 'none')
        : (e.target.style.border = '1px solid red');
    }
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/users/signup', details);
      console.log(tempDetails);
      setDetails(tempDetails);
      navigate('/');
    } catch (error) {
      setErrorMessage(true);
    }
  };

  return (
    <main>
      <Wrapper className='page-100 section section-center'>
        <div className='details'>
          <h2 className='form-head scriptFont'>beads by kaph</h2>
          <form className='shipping-details'>
            <h5 className='form-title '>Sign Up Page</h5>
            <div className='form-name'>
              {/* <label htmlFor="photo">
                {imageFile.filePreview ? (
                  <img src={imageFile.filePreview} alt="preview" />
                ) : (
                  <div>
                    <BsUpload />
                    <br />
                    <span>Upload Image</span>
                  </div>
                )}
              </label>
              {imageFile.filePreview ? (
                <button onClick={removeImage} className="removeImage">
                  remove image
                </button>
              ) : null}
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                className="photo"
                onChange={handleImage}
              /> */}
              <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter First Name'
                value={details.firstname}
                onChange={handleChange}
              />

              <input
                type='text'
                name='lastname'
                id='lastName'
                placeholder='Enter Last Name'
                value={details.lastname}
                onChange={handleChange}
              />
            </div>

            <input
              type='username'
              name='username'
              id='username'
              placeholder='Enter User Name'
              value={details.username}
              onChange={handleChange}
            />

            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter Email'
              value={details.email}
              onChange={handleChange}
            />
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter Password'
              value={details.password}
              onChange={handleChange}
            />

            <input
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              placeholder='Confirm Password'
              value={details.passwordConfirm}
              onChange={handleChange}
            />
            <button className='btn btn-link' onClick={handleSubmit}>
              Register
            </button>
            {errorMessage && <p>Something Wrong Happened. Please try again</p>}
          </form>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-head {
    color: black !important;
  }
  .shipping-details {
    display: flex;
    flex-direction: column;
    width: 80%;
    @media (max-width: 768px) {
      width: 90%;
    }
    @media (max-width: 480) {
      width: 100%;
    }
  }
  .details {
    padding: 30px;
    box-shadow: var(--light-shadow);
    border-radius: var(--radius);
    background-color: rgba(0, 0, 0, 0.1);
    width: 60%;
    display: grid;
    place-items: center;
    @media (max-width: 720px) {
      width: 95%;
    }
  }
  input {
    margin-block: 1em;
    border: none;
    padding: 0.5em;
    font-size: 1em;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.8);
  }
  .selectStyle {
    margin-block: 1em;
    border: none;
  }
  .form-name {
    display: flex;
    justify-content: space-between;
    @media (max-width: 1080px) {
      flex-direction: column;
    }
  }
  .form-title {
    margin-block: 1em;
    text-transform: uppercase;
    color: purple;
  }
  // label {
  //   border: 3px solid white;
  //   border-radius: 50%;
  //   margin: 1em auto;
  //   height: 100px;
  //   width: 100px;
  //   cursor: pointer;
  //   display: grid;
  //   place-items: center;
  //   text-align: center;
  // }
  // label > div > span {
  //   font-family: monospace;
  //   font-size: 12px;
  // }
  .btn {
    padding-block: 1em;
    margin-top: 1em;
    font-size: 0.75em;
  }
  .btn-link {
    display: grid;
    place-items: center;
  }
  // .photo {
  //   display: none;
  // }
  // img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  //   border-radius: 50%;
  // }
  // .removeImage {
  //   border: none;
  //   width: auto;
  //   margin-inline: auto;
  //   margin-bottom: 1em;
  //   background-color: transparent;
  //   font-size: 12px;
  //   cursor: pointer;
  //   &:hover {
  //     color: purple;
  //     text-transform: underline;
  //   }
  // }

  p {
    color: red;
    font-size: 12px;
    font-family: monospace;
    margin-top: 5px;
  }
`;

export default Signup;
