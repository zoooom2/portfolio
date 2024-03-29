import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import FormInput from '../global_components/FormInput';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { ArticleType, ContentItem } from '../types';
import {
  fetchSingleArticle,
  updateArticle,
  uploadArticle,
} from '../features/globalSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminForm = () => {
  const { id } = useParams();
  const { singleArticle } = useAppSelector((state) => state.global);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);
  const [articleData, setArticleData] = useState<ArticleType>({
    _id: '',
    title: id ? singleArticle.title : '',
    titleUl: singleArticle.titleUl || '',
    image: singleArticle.image || '',
    overview: singleArticle.overview || '',
    author: singleArticle.author || '',
    dateCreated: singleArticle.dateCreated || '',
    content: singleArticle.content || [],
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showError]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(selectedFile);
    setPreview(objectURL);
  }, [selectedFile]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleArticle(id));
    } else {
      setPreview('');
      setSelectedFile(undefined);
      setArticleData({
        _id: '',
        title: '',
        titleUl: '',
        image: '',
        overview: '',
        author: '',
        dateCreated: '',
        content: [],
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    // if (id) {
    //   setArticleData({ ...singleArticle });
    // }
    const fetchData = async () => {
      if (id && singleArticle) {
        const imageFile = await downloadImage(
          singleArticle.image as string,
          id
        );
        setSelectedFile(imageFile);
        setArticleData({ ...singleArticle });
      }
    };
    fetchData();
  }, [id, singleArticle]);

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, validity, dataset } = e.target;

    const { index }: { index: string } = dataset as { index: string };

    if (validity.valid) setIsFormValid(true);
    if (name === 'topic' || name === 'description') {
      const updatedContent = articleData.content.map(
        (contentData, position) => {
          if (+index === position) {
            return { ...contentData, [name]: value };
          } else {
            return { ...contentData };
          }
        }
      );
      setArticleData({
        ...articleData,
        content: [...updatedContent],
      });
    } else {
      setArticleData({ ...articleData, [name]: value });
    }
  };
  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => {
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
        if (!element.validity.valid) {
          setIsFormValid(false);
          setShowError(true);
          console.log('form is not valid');

          return;
          // Stop checking if any field is invalid
        }
      }
    }
    // return;
    setShowError(true);

    // If all fields are valid, navigate to the next stage
    if (isFormValid) {
      // convert date to iso format
      const formatBackendData = {
        ...articleData,
        dateCreated: new Date(articleData.dateCreated).toISOString(),
      } as ArticleType;

      const formData: FormData = new FormData();

      for (const item in formatBackendData) {
        if (item !== 'content' && item !== 'image') {
          formData.append(item, formatBackendData[item] as string);
        } else if (item === 'image') {
          if (selectedFile && selectedFile) {
            formData.append(item, selectedFile as File);
          } else {
            formData.append(item, formatBackendData[item]);
          }
        } else if (item === 'content') {
          const contentArray = formatBackendData[item] as ContentItem[];
          for (let i = 0; i < contentArray.length; i++) {
            const contentItem = contentArray[i];
            Object.entries(contentItem).forEach(([key, value]) => {
              formData.append(`content[${i}][${key}]`, value as string);
            });
          }
        }
      }
      try {
        if (id) {
          dispatch(updateArticle({ id, body: formData }));
        } else {
          dispatch(
            uploadArticle({
              body: formData,
            })
          );
        }
        navigate('/admin/articles');
      } catch (error) {
        setShowError(true);
      }
    }
  };

  const downloadImage = async (url: string, name: string) => {
    const response = await axios.get(url, { responseType: 'blob' });
    const file = new File([response.data], name, {
      type: response.headers['content-type'],
    });
    return file;
  };

  const addContent = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setArticleData({
      ...articleData,
      content: [...articleData.content, { topic: '', description: '' }],
    });
  };

  const deleteContent = (position: number) => {
    setArticleData({
      ...articleData,
      content: articleData.content.filter((_, index) => position !== index),
    });
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setArticleData({ ...articleData, image: '' });
  };

  return (
    <form className='mt-[80px] p-4 tablet:p-10 laptop:px-16 gap-[16px] tablet:gap-[24px] tablet:w-9/12 laptop:w-7/12 flex flex-col font-satoshi'>
      <div
        className={`text-[#ed0000] font-baz1 text-[12px] tablet:text-[19px] ${
          !showError && 'hidden'
        }`}>
        *Something went wrong
      </div>
      <FormInput
        type='text'
        name='title'
        label='Title'
        id='title'
        className='w-full text-[10px] px-[16px] tablet:text-[15px]'
        value={articleData.title}
        onChange={onChange}
        required
      />
      <FormInput
        type='text'
        name='titleUl'
        label='Subtitle'
        id='subtitle'
        className='w-full text-[10px] px-[16px] tablet:text-[15px]'
        value={articleData.titleUl}
        onChange={onChange}
        required
      />
      <div className='flex flex-col gap-[10px]'>
        <FormInput
          type='file'
          name='image'
          label='Image'
          id='image'
          accept='image/*'
          className='w-full text-[10px] px-[16px] tablet:text-[15px]'
          onChange={onSelectFile}
          // required
        />
        {(selectedFile || articleData.image) && (
          <div className='w-[200px]'>
            <img
              src={
                selectedFile
                  ? (preview as string)
                  : (articleData.image as string)
              }
              alt=''
              className='w-full'
            />
          </div>
        )}
      </div>

      <div className='flex flex-col font-satoshi'>
        <label
          htmlFor='overview'
          className='laptop:text-[24px] tablet:text-[18px] font-medium text-[14px] capitalize text-[#01248c]'>
          Overview
        </label>
        <textarea
          name='overview'
          id='overview'
          cols={30}
          rows={10}
          onChange={onChange}
          value={articleData.overview}
          className='laptop:py-[18px] tablet:py-[14px] py-[10px] max-tablet:w-4/5 bg-[#f2f4f7] rounded-[8px] w-full text-[10px] px-[16px] tablet:text-[15px] text-black'
          required
        />
      </div>
      <FormInput
        type='text'
        name='author'
        label='Author'
        id='author'
        className='w-full text-[10px] px-[16px] tablet:text-[15px]'
        value={articleData.author}
        onChange={onChange}
        required
      />
      <FormInput
        type='date'
        name='dateCreated'
        label='Date Created'
        id='date'
        className='w-full text-[10px] px-[16px] tablet:text-[15px]'
        value={articleData.dateCreated}
        placeholder='Pick a date'
        onChange={onChange}
        required
      />
      <div className='flex flex-col gap-4'>
        {articleData.content.map((_, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <FormInput
              type='text'
              name='topic'
              label='Topic'
              id='topic'
              data-index={index}
              className='w-full text-[10px] px-[16px] tablet:text-[15px]'
              value={articleData.content[index].topic}
              onChange={onChange}
              required
            />
            <div className='flex flex-col gap-[8px]'>
              <label
                htmlFor='description'
                className='laptop:text-[24px] tablet:text-[18px] text-[14px] capitalize text-[#01248c] font-medium'>
                Description
              </label>
              <textarea
                name='description'
                id='description'
                cols={30}
                rows={10}
                data-index={index}
                onChange={onChange}
                value={articleData.content[index].description}
                className='laptop:py-[18px] tablet:py-[14px] py-[10px] max-tablet:w-4/5 bg-[#f2f4f7] rounded-[8px] w-full text-[10px] px-[16px] tablet:text-[15px] text-black'
                required
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteContent(index);
              }}
              className='w-fit text-[#01248C] text-lg bg-[#f2f4f7]'>
              {<FaTrash />}
            </button>
          </div>
        ))}
        <div className='flex gap-[20px]'>
          <div className='border border-dashed border-[#01248c] p-3 text-[#01248c]'>
            Add new content
          </div>
          <button
            onClick={addContent}
            className='text-[#01248C] text-lg bg-[#f2f4f7]'>
            {<FaPlus />}
          </button>
        </div>
      </div>
      <button onClick={handleSubmit} className='text-white bg-[#01248c]'>
        {id ? 'Update Article' : 'create Article'}
      </button>
    </form>
  );
};

export default AdminForm;
