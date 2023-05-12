import styled from 'styled-components';
import { getUniqueValues } from '../utils/helpers';
import { priceFormat } from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFilters,
  clearFilters,
} from '../features/filterFeature/filterSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const {
    filters: { text, category, min_price, max_price, price, shipping },
    all_products,
  } = useSelector((state) => state.filter);

  const categories = getUniqueValues(all_products, 'category');

  const handleFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'color') {
      value = e.target.dataset.color;
    }
    if (name === 'shipping') {
      value = e.target.checked;
    }
    dispatch(updateFilters({ name, value }));
  };

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              name='text'
              className='search-input'
              value={text}
              onChange={handleFilter}
              placeholder='search'
            />
          </div>
          <div className='form-control sub-control'>
            <span className='label'>Category:</span>
            <select name='category' onChange={handleFilter} value={category}>
              {categories.map((c, index) => (
                <option
                  key={index}
                  className={`${
                    category.toLowerCase() === c.toLowerCase() ? 'active' : null
                  }`}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className='form-control sub-control'>
            <div className='label'>Price:</div>
            <div className='price'>{priceFormat(price)}</div>
            <input
              type='range'
              name='price'
              onChange={handleFilter}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          <div className='form-control shipping'>
            <label htmlFor='shipping' className='label'>
              free shipping
            </label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={handleFilter}
              checked={shipping}
            />
          </div>
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFilters())}>
          clearFilters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  .content {
    background-color: white;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }

  form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2em;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1em;
    }
  }
  .form-control {
    margin-bottom: 1rem;
  }
  input {
    margin-block: 0;
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: 0.1em;
    font-family: poppins;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  .sub-control {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }
  .label {
    font-family: poppins;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
