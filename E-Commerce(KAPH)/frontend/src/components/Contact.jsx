import React, { useState } from 'react';
import styled from 'styled-components';

const Contact = () => {
  let [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(e.target.name);
    setEmail('');
  };
  return (
    <Wrapper>
      <div className="section-center">
        <h3 className="scriptFont">Join our NewsLetter</h3>
        <div className="content">
          <p>
            Join our newsletter to get update on our exclusive deals and also to
            get update about our new products
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-input"
              name="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  background: rgba(0, 0, 0, 0.1);
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 90%;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: black;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: white;
  }
  .submit-btn:hover {
    transform: scale(1.2);
    transform-origin: center;
    transition: translateX(10%);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    // padding: 15rem 0;
  }
`;

export default Contact;
