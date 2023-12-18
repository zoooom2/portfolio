import { ChangeEvent, MouseEvent, SyntheticEvent, useEffect } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { products_url as url } from '../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import { fetchSingleProduct } from '../../../productFeature/productSlice';
import Hero from '../Layout/Hero';
import { SingleProductType } from '../../../../types';
import {
  clearFormImages,
  createProduct,
  loadFormProduct,
  resetFormProduct,
  setFieldMode,
  setFormImages,
  setFormValidity,
  setShowErrorMessage,
  updateFormProduct,
  updateProduct,
} from '../../adminSlice';
import FormInput from '../../../../global_components/FormInput';
import { FaPlus, FaTrash } from 'react-icons/fa';
import FormTextArea from '../../../../global_components/FormTextArea';
import axios from 'axios';

const AdminProductForm = ({
  type,
}: {
  type: 'detail' | 'create';
  product?: SingleProductType;
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    formTempProduct,
    formErrorMessage,
    formFieldMode,
    formImages,
    isFormValid,
  } = useAppSelector((state) => state.admin);

  const { single_product } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(`${url}${id}`));
    } else {
      dispatch(resetFormProduct());
      dispatch(clearFormImages());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && single_product) {
      dispatch(loadFormProduct({ ...single_product }));
      dispatch(setFormImages(single_product.images));
    }
  }, [dispatch, id, single_product]);

  const addSize = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (type === 'detail' && formFieldMode === 'update')
      dispatch(
        updateFormProduct({
          detail: 'sizes',
          info: [...formTempProduct.sizes, { size: '', quantity: '' }],
        })
      );
  };
  const deleteSize = (position: number) => {
    const updatedSizes = formTempProduct.sizes.filter(
      (_, index) => position !== index
    );
    dispatch(updateFormProduct({ detail: 'sizes', info: updatedSizes }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setShowErrorMessage(false));
    }, 10000);
    return () => clearTimeout(timer);
  }, [formErrorMessage]);

  const enableEdit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setFieldMode('update'));
  };

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, validity, dataset } = e.target;

    const { index }: { index: string } = dataset as { index: string };

    if (validity.valid) dispatch(setFormValidity(true));
    if (name === 'size' || name === 'quantity') {
      const updatedSizes = formTempProduct.sizes.map((data, position) => {
        if (+index === position) {
          return { ...data, [name]: value };
        } else {
          return { ...data };
        }
      });
      dispatch(
        updateFormProduct({
          detail: 'sizes',
          info: updatedSizes,
        })
      );
    } else {
      dispatch(
        updateFormProduct({
          detail: name,
          info: value,
        })
      );
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Get all form elements
    const form = e.currentTarget.form;
    if (!form) {
      console.error('Form not found');
      return;
    }

    const formElements = form.elements;

    // Check validity for each form element
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement | HTMLTextAreaElement;

      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        if (!element.validity.valid && element.name !== 'image') {
          dispatch(setFormValidity(false));
          dispatch(setShowErrorMessage(true));

          console.log('form is not valid');

          return;
          // Stop checking if any field is invalid
        } else if (
          !element.validity.valid &&
          element.name === 'image' &&
          !formImages
        ) {
          dispatch(setFormValidity(false));
          dispatch(setShowErrorMessage(true));

          console.log('form is not valid');

          return;
        }
      }
    }
    // return;
    dispatch(setShowErrorMessage(true));

    const getExtension = (contentType: string) => {
      const match = contentType.match(/\/(.+)$/);
      return match ? match[1] : '';
    };

    // If all fields are valid, navigate to the next stage
    if (isFormValid) {
      const formData: FormData = new FormData();
      let item: keyof SingleProductType;
      for (item in formTempProduct) {
        if (item !== 'sizes' && item !== 'images' && item !== '_id') {
          formData.append(item, formTempProduct[item] as string);
        } else if (item === 'images') {
          if (formImages) {
            for (let i = 0; i < formImages.length; i++) {
              const img = formImages[i];

              if (img.startsWith('blob')) {
                const response = await axios.get(img, { responseType: 'blob' });
                const contentType = response.headers['content-type'];
                const file = new File(
                  [response.data],
                  `file${i}.${getExtension(contentType)}`,
                  {
                    type: contentType,
                  }
                );
                formData.append(`images`, file);
              } else {
                formData.append(`images`, img);
              }
            }
          }
        } else if (item === 'sizes') {
          const sizeArray = formTempProduct[item];
          for (let i = 0; i < sizeArray.length; i++) {
            const { size, quantity } = sizeArray[i];
            formData.append(`sizes[${i}][size]`, size);
            formData.append(`sizes[${i}][quantity]`, String(quantity));
          }
        }
      }

      try {
        if (id) {
          dispatch(updateProduct({ id, data: formData }));
          // console.log(formData.get('description'));
        } else {
          dispatch(createProduct(formData));
        }
        dispatch(clearFormImages());
        dispatch(setFieldMode('fixed'));
        navigate('/admin/product');
      } catch (error) {
        dispatch(setShowErrorMessage(true));
      }
    }
  };

  const handleCancel = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    type === 'detail' &&
      (formFieldMode === 'fixed'
        ? navigate('/admin/product')
        : dispatch(setFieldMode('fixed')));
    type === 'create' && navigate('/admin/product');
  };
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) {
      return;
    }
    const selectedFilesUrl = [...selectedFiles].map((file: File) =>
      URL.createObjectURL(file)
    );
    // console.log(selectedFilesUrl);
    dispatch(setFormImages([...formImages, ...selectedFilesUrl]));
  };

  // console.log(formImages);

  const options = [
    { value: 'small', option: 'S' },
    { value: 'medium', option: 'M' },
    { value: 'large', option: 'L' },
    { value: 'x-large', option: 'XL' },
    { value: '2x-large', option: 'XXL' },
  ];

  const deleteImage = (position: number) => {
    const filteredImages = formImages.filter((_, index) => position !== index);
    dispatch(setFormImages([...filteredImages]));
  };

  return (
    <div className='w-full'>
      <form
        className='w-full
      '>
        <Hero
          title={'Product'}
          subtitle={'Product Details'}
          description={'Create new product'}
          button={[
            {
              icon: AiOutlinePlus,
              name:
                type === 'create'
                  ? 'Publish Product'
                  : formFieldMode === 'fixed'
                  ? 'Edit Product'
                  : 'Update Product',
              action:
                type === 'create'
                  ? handleSubmit
                  : formFieldMode === 'fixed'
                  ? enableEdit
                  : handleSubmit,
            },
            {
              icon: AiOutlineClose,
              name: 'Cancel',
              action: handleCancel,
            },
          ]}
        />

        <div className='flex flex-col py-[32px] px-[16px] tablet:px-[48px] laptop:w-10/12 gap-[33px]'>
          <div className='flex flex-col gap-[33px] '>
            <div className='font-baz1 text-[24px] tablet:text-[28px] font-medium'>
              Product Information
            </div>
            <div className='grid tablet:grid-cols-2 gap-5 tablet:gap-10 w-full'>
              <FormInput
                type='text'
                name='productName'
                label='productName'
                id='productName'
                placeholder='Enter product name'
                className=' text-[10px] px-[16px] tablet:text-[15px] w-full'
                value={formTempProduct.productName}
                onChange={onChange}
                mode={type}
                required
              />
              <FormInput
                type='number'
                name='price'
                label='price'
                id='price'
                className='w-full text-[10px] px-[16px] tablet:text-[15px]'
                placeholder='enter price'
                value={formTempProduct.price || ''}
                onChange={onChange}
                mode={type}
                required
              />
              <FormInput
                type='text'
                name='collectionName'
                label='collectionName'
                id='collectionName'
                placeholder='Enter collection name'
                className=' text-[10px] px-[16px] tablet:text-[15px] w-full'
                value={formTempProduct.collectionName || ''}
                onChange={onChange}
                mode={type}
                required
              />
              <FormInput
                type='text'
                name='category'
                label='category'
                id='category
                '
                className='w-full text-[10px] px-[16px] tablet:text-[15px]'
                placeholder='enter category'
                value={formTempProduct.category || ''}
                onChange={onChange}
                mode={type}
                required
              />
            </div>
            <FormTextArea
              label='Product description'
              name='description'
              onChange={onChange}
              placeholder='Enter Description'
              value={formTempProduct.description}
              mode={type}
              required={true}
              // className='w-full text-[10px] px-[16px] tablet:text-[15px]'
            />

            <div className='flex flex-col gap-[10px]'>
              <FormInput
                label='image'
                type='file'
                name='image'
                id='image'
                accept='image/*'
                className='w-full text-[10px] px-[16px] tablet:text-[15px] min-h-[2em]'
                multiple
                onChange={onSelectFile}
                max={4}
                mode={type}
                // required
              />

              {formImages && (
                <div className='flex gap-3 flex-wrap'>
                  {formImages.map((image, index) => (
                    <div
                      key={index}
                      className='aspect-[230/317] w-[100px] flex relative flex-col items-center gap-2'>
                      <img
                        src={image as string}
                        alt=''
                        className='w-full h-full'
                      />
                      <button
                        className=' text-black'
                        onClick={(e) => {
                          e.preventDefault();
                          deleteImage(index);
                        }}>
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-[33px]'>
            <div className='font-baz1 text-[24px] tablet:text-[28px] font-medium'>
              Product Variables
            </div>
            {formTempProduct.sizes.map((temp, index) => (
              <div key={index} className='grid grid-cols-2 tablet:w-1/2 gap-4'>
                <div className='flex flex-col gap-[8px]'>
                  <label
                    htmlFor='size'
                    className='font-baz1 text-baz-black laptop:text-[20px] tablet:text-[18px] font-medium text-[14px] capitalize'>
                    Size
                  </label>
                  <select
                    name='size'
                    id='size'
                    data-index={index}
                    onChange={onChange}
                    // mode={type}
                    value={temp.size}
                    required
                    className='w-full text-[10px] px-[16px] tablet:text-[15px] h-full border-[#a2a2a2] border-[1.5px] bg-transparent'>
                    <option value={''} disabled>
                      --select a value
                    </option>
                    {options.map(({ option, value }, index) => (
                      <option key={index} value={value}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <FormInput
                  type='number'
                  name='quantity'
                  label='Quantity'
                  id='quantity'
                  mode={type}
                  placeholder='Enter quantity'
                  data-index={index}
                  className='w-full text-[10px] px-[16px] tablet:text-[15px]'
                  onChange={onChange}
                  value={temp.quantity}
                  required={true}
                />
                <button
                  className=''
                  onClick={(e) => {
                    e.preventDefault();
                    deleteSize(index);
                  }}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <div className='flex gap-[20px]'>
              <button
                className='border border-dashed border-black p-5 w-fit tablet:w-1/2 justify-center text-[#2a2a2a] font-baz1 text-[10px] tablet:text-[16px] flex items-center gap-2'
                onClick={addSize}>
                <div>
                  <FaPlus />
                </div>
                <div>Add new variable and quantity</div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
