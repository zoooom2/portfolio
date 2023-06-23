import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { single_product_url as url } from '../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import { fetchSingleProduct } from '../../../productFeature/productSlice';
import Hero from '../Layout/Hero';

const AdminProductCreate = ({ type }: { type: 'detail' | 'create' }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single_product: product } = useAppSelector((state) => state.product);

  const loadProduct = useCallback(() => {
    dispatch(fetchSingleProduct(`${url}${id}`));
  }, [id]);

  useEffect(() => {
    type === 'detail' && loadProduct();
  }, [type]);

  const [detailMode, setDetailMode] = useState<'fixed' | 'update'>('fixed');

  const validationSchema = yup.object().shape({
    productName: yup.string().required('productName is required'),
    price: yup.number().required('price is required'),
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
    images: yup.array().of(yup.string().url()),
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
    // getValues,
    // setValue,
    // reset,
    // trigger,
  } = form;

  //   const {
  //     errors,
  //     isDirty,
  //     isValid,
  //     isSubmitting,
  //     // isSubmitted,
  //     isSubmitSuccessful,
  //   } = formState;

  let { isDisabled } = watch();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  const onError = (errors: FieldErrors) => {
    console.log(errors);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log(url);
    }
  };
  const enableEdit = () => {
    setDetailMode('update');
  };
  const handlePublish = () => {
    console.log('Publish');
  };

  const handleUpdate = () => {
    console.log('Update');
  };

  const handleCancel = () => {
    console.log('Cancel');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
            { icon: AiOutlineClose, name: 'Cancel', action: handleCancel },
          ]}
        />

        <div className='flex flex-col pl-[48px] pt-[32px] pb-[80px] w-4/6'>
          <div className='flex flex-col gap-[25px]'>
            <div className='font-baz1 text-[28px] font-medium'>
              Product Information
            </div>
            <div className='flex gap-[10%]'>
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label htmlFor='productName' className='font-baz1 text-[20px]'>
                  Product Name
                </label>
                <input
                  type='text'
                  {...register('productName')}
                  id='productName'
                  disabled={detailMode === 'update'}
                  {...(type === 'detail' ? { onChange: handleChange } : {})}
                  {...(type === 'detail'
                    ? { defaultValue: product.productName }
                    : {})}
                />
              </div>
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label htmlFor='price' className='font-baz1 text-[20px]'>
                  Price
                </label>
                <input
                  type='number'
                  id='price'
                  disabled={isDisabled}
                  {...register('price')}
                  {...(type === 'detail'
                    ? { defaultValue: product.price }
                    : {})}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='description' className='font-baz1 text-[20px]'>
                Description
              </label>
              <textarea
                className='border border-solid border-black py-2 px-4'
                {...register('description')}
                id='description'
                cols={10}
                rows={8}
                disabled={isDisabled}
                {...(type === 'detail'
                  ? { defaultValue: product.description }
                  : {})}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='font-baz1 text-[20px]'>Media</div>
              <div className='flex gap-2'>
                {type === 'detail' &&
                  product.images.map((image, index) => {
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
                  disabled={isDisabled}
                  {...register('image')}
                  className='hidden'
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col mt-[60px] gap-5'>
            <div className='font-baz1 text-[28px] font-medium'>
              Product Sizing
            </div>
            <div className='flex gap-[10%] w-[491px]'>
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label htmlFor='size' className='font-baz1 text-[20px]'>
                  Size
                </label>
                <div className='flex justify-around border border-solid border-[#b6b6b6] mt-2 pr-2'>
                  <select
                    id='size'
                    disabled={isDisabled}
                    {...register('size')}
                    className={' w-full p-3'}>
                    <option value='M'>Medium</option>
                    <option value='L'>Large</option>
                    <option value='XL'>Extra Large</option>
                  </select>
                </div>
              </div>
              <div className='flex flex-col gap-1 basis-[45%]'>
                <label htmlFor='quantity' className='font-baz1 text-[20px]'>
                  Quantity
                </label>
                <input
                  type='number'
                  id='quantity'
                  disabled={isDisabled}
                  {...register('quantity')}
                />
              </div>
            </div>
            <div className='flex gap-2 items-center justify-center border border-dashed w-[490px] h-[79px]'>
              <AiOutlinePlus />{' '}
              <span className='text-[#2a2a2a] font-baz1'>
                add new size and quantity
              </span>
            </div>
          </div>
          <DevTool control={control} />
        </div>
      </form>
    </div>
  );
};

export default AdminProductCreate;
