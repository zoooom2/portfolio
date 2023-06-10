import { useContext } from 'react';
import { FilterContext } from '../contextProviders/filter_context';

const useFilterContext = () => {
  return useContext(FilterContext);
};

export default useFilterContext;
