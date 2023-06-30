import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  FieldErrors,
  FieldValues,
  useForm,
  useFieldArray,
} from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { single_product_url as url } from '../../../../utils/constants';
import { useAppDispatch } from '../../../../App/hooks';
import { fetchSingleProduct } from '../../../productFeature/productSlice';
import Hero from '../Layout/Hero';
import { SingleProductType } from '../../../../types';
import { createProduct, updateProduct } from '../../adminSlice';

const AdminProductForm = ({
  type,
  product,
}: {
  type: 'detail' | 'create';
  product?: SingleProductType;
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadProduct = useCallback(() => {
    dispatch(fetchSingleProduct(`${url}${id}`));
  }, [dispatch, id]);

  useEffect(() => {
    type === 'detail' && loadProduct();
  }, [loadProduct, type]);

  const [detailMode, setDetailMode] = useState<'fixed' | 'update'>('fixed');
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const validationSchema = yup.object().shape({
    productName: yup.string().required('productName is required'),
    price: yup.number().required('price is required'),
    category: yup.string().required('category is required'),
    collectionName: yup.string().required('collectionName is required'),
    description: yup
      .string()
      .required()
      .test('word count', 'Description must be 100 words or less', (value) => {
        if (value) {
          const words = value.split(' ');
          return words.length <= 100;
        }
        return true;
      }),
    sizes: yup
      .array()
      .of(
        yup.object().shape({
          size: yup.string().required('Size name is required'),
          quantity: yup.number().required('Quantity is required'),
        })
      )
      .min(1, 'At least one size must be provided'),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    setError,
    watch,
    getValues,
    setValue,
    reset,
    // trigger,
  } = form;

  const { fields, append, remove } = useFieldArray({ name: 'sizes', control });
  useEffect(() => {
    type === 'detail' && setValue('productName', product?.productName);
    type === 'detail' && setValue('price', product?.price);
    type === 'detail' && setValue('description', product?.description);
    type === 'detail' && setValue('images', product?.images);
    type === 'detail' && setValue('productName', product?.productName);
    type === 'detail' && setValue('category', product?.category);
    type === 'detail' && setValue('collectionName', product?.collectionName);
    type === 'detail'
      ? setValue('sizes', product?.sizes)
      : setValue('sizes', [{ size: null, quantity: null }]);
  }, [product, type]);

  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    // isSubmitted,
    isSubmitSuccessful,
  } = formState;

  const onSubmit = async (data: FieldValues) => {
    if (isValid && !isSubmitting) {
      try {
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('price', data.price.toString());
        formData.append('collectionName', data.collectionName);
        formData.append('category', data.category);
        formData.append('description', data.description);

        if (imageFile) {
          for (let i = 0; i < imageFile.length; i++) {
            formData.append('coverImages', imageFile[i]);
          }
        }

        for (let i = 0; i < data.sizes.length; i++) {
          formData.append(`sizes[${i}][size]`, data.sizes[i].size);
          formData.append(
            `sizes[${i}][quantity]`,
            data.sizes[i].quantity.toString()
          );
        }

        if (type === 'create') {
          if (formData) dispatch(createProduct(formData));
          reset();
          console.log('Product created successfully!');
        } else if (type === 'detail' && product && formData) {
          dispatch(updateProduct({ id: product._id, data: formData }));
          // reset();
          console.log('Product updated successfully!');
        }

        // Redirect or perform other actions after submission
        isSubmitSuccessful && navigate('/admin/product');
      } catch (error) {
        console.log('An error occurred while submitting the form:', error);
      }
    }
  };

  const onError = (errors: FieldErrors) => {
    console.log(errors);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setImageFile(files);
  };

  const enableEdit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDetailMode('update');
  };
  const handlePublish = () => {
    // e.preventDefault();
    // console.log('Publish');
  };

  const handleUpdate = () => {
    // dispatch(updateProduct)
  };

  const handleCancel = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    type === 'detail' &&
      (detailMode === 'fixed'
        ? navigate('/admin/product')
        : setDetailMode('fixed'));
    type === 'create' && navigate('/admin/product');
  };

  return (
    <div className='w-full'>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
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
                  : detailMode === 'fixed'
                  ? 'Edit Product'
                  : 'Update Product',
              action:
                type === 'create'
                  ? handlePublish
                  : detailMode === 'fixed'
                  ? enableEdit
                  : handleUpdate,
            },
            {
              icon: AiOutlineClose,
              name: 'Cancel',
              action: handleCancel,
            },
          ]}
        />

        <div className='flex flex-col pl-[48px] pt-[32px] pb-[80px] w-4/6 max-md:w-5/6'>
          <div className='flex flex-col gap-[25px]'>
            <div className='font-baz1 text-[28px] font-medium'>
              Product Information
            </div>
            <div className='grid grid-cols-2 gap-[10%]'>
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label
                  htmlFor='productName'
                  className='font-baz1 text-[20px] max-sm:text-sm'>
                  Product Name
                </label>
                <input
                  type='text'
                  {...register('productName')}
                  id='productName'
                  disabled={detailMode === 'fixed' && type === 'detail'}
                  {...(type === 'detail'
                    ? { defaultValue: product?.productName }
                    : {})}
                />
              </div>
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label
                  htmlFor='price'
                  className='max-sm:text-sm font-baz1 text-[20px]'>
                  Price
                </label>
                <input
                  type='number'
                  id='price'
                  disabled={detailMode === 'fixed' && type === 'detail'}
                  {...register('price')}
                  {...(type === 'detail'
                    ? { defaultValue: product?.price }
                    : {})}
                />
              </div>{' '}
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label
                  htmlFor='category'
                  className='capitalize font-baz1 text-[20px] max-sm:text-sm'>
                  category
                </label>
                <input
                  type='text'
                  {...register('category')}
                  id='category'
                  disabled={detailMode === 'fixed' && type === 'detail'}
                  {...(type === 'detail'
                    ? { defaultValue: product?.category }
                    : {})}
                />
              </div>{' '}
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label
                  htmlFor='collection'
                  className='font-baz1 text-[20px] max-sm:text-sm'>
                  Collection
                </label>
                <input
                  type='text'
                  {...register('collectionName')}
                  id='collection'
                  disabled={detailMode === 'fixed' && type === 'detail'}
                  {...(type === 'detail'
                    ? { defaultValue: product?.collectionName }
                    : {})}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='description'
                className='font-baz1 text-[20px] max-sm:text-sm'>
                Description
              </label>
              <textarea
                className='border border-solid border-black py-2 px-4'
                {...register('description')}
                id='description'
                cols={10}
                rows={8}
                disabled={detailMode === 'fixed' && type === 'detail'}
                {...(type === 'detail'
                  ? { defaultValue: product?.description }
                  : {})}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='font-baz1 text-[20px] max-sm:text-sm'>Media</div>
              <div className='flex gap-2'>
                {type === 'detail' &&
                  product?.images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className='p-2 w-[187px] h-[155px] border border-dashed border-black flex flex-col justify-center items-center'>
                        <img
                          src={image}
                          className='object-contain w-full h-full'
                          alt='product img'
                        />
                      </div>
                    );
                  })}
                <label htmlFor='image' className='cursor-pointer'>
                  <div className='w-[187px] h-[155px] border border-dashed border-black flex flex-col justify-center items-center'>
                    <div>
                      <BsCardImage size={70} />
                    </div>
                    <div className='font-baz1'>Browse Image</div>
                  </div>
                </label>
                <input
                  type='file'
                  id='image'
                  disabled={detailMode === 'fixed' && type === 'detail'}
                  // {...register('images')}
                  className='hidden'
                  onChange={handleFileChange}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col mt-[60px] gap-5'>
            <div className='font-baz1 text-[28px] font-medium'>
              Product Sizing
            </div>
            <div className='flex gap-[10%] flex-col'>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className='grid grid-cols-2 gap-[10px] justify-between w-full'>
                    <div className='flex flex-col gap-1 basis-[45%]'>
                      <div className='flex justify-around border border-solid border-[#b6b6b6] mt-2 pr-2'>
                        <select
                          id='size'
                          disabled={detailMode === 'fixed' && type === 'detail'}
                          // defaultValue={''}
                          {...register(`sizes.${index}.size`)}
                          className={'outline-none w-full p-3'}>
                          <option disabled value=''>
                            Select size
                          </option>
                          <option value='M'>Medium</option>
                          <option value='L'>Large</option>
                          <option value='XL'>Extra Large</option>
                        </select>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 basis-[45%]'>
                      <input
                        type='number'
                        id='quantity'
                        min={0}
                        placeholder='Quantity'
                        disabled={detailMode === 'fixed' && type === 'detail'}
                        {...register(`sizes.${index}.quantity`)}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        className='text-red-600'
                        onClick={() => remove(index)}>
                        <AiOutlineClose />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              type={'button'}
              onClick={() => append({ name: null, quantity: null })}
              disabled={detailMode === 'fixed' && type === 'detail'}
              className='flex gap-2 items-center justify-center border border-dashed w-full h-[79px]'>
              <AiOutlinePlus />
              <span className='text-[#2a2a2a] font-baz1'>
                add new size and quantity
              </span>
            </button>
          </div>
          <DevTool control={control} />
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
