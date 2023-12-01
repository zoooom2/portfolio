// import axios from 'axios';

// export const uploadToCloudinary = async ({
//   cloudName,
//   folderPath,
//   file,
//   uploadPreset,
// }: Record<'cloudName' | 'folderPath' | 'uploadPreset', string> & {
//   file: File;
// }) => {
//   try {
//     const apiUrl = `${
//       import.meta.env.VITE_CLOUDINARY_URL
//     }/${cloudName}/image/upload`;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', uploadPreset);
//     formData.append('folder', folderPath);

//     const response = await axios.post(apiUrl, formData, {
//       withCredentials: false,
//       headers: { 'Access-Control-Allow-Origin': '*' },
//     });
//     console.log(response.data);
//     console.log(response.data.secure_url);
//     return response.data;
//   } catch (err) {
//     console.error('Error uploading image: ' + err);
//   }
// };
