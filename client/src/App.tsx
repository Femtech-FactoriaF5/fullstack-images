import React from 'react';
import './App.css';
import serviceImage from './services/images';

import { Layout, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ImageList from './features/ImageList/ImageList';
import { ImageModal } from './features/ImageModal/ImageModal';
import UpdateModal from './features/UpdateModal/UpdateModal';


const { Header, Content } = Layout;

export default function App() {

  //state definition
  const [images, setImages] = React.useState<Image[]>([]);
  const [newImage, setNewImage] = React.useState({});
  const [updateImage, setUpdateImage] = React.useState({});
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = React.useState(false);

  //modal control functions
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  const handleUpdateModalOk = () => setIsUpdateModalVisible(false);
  const handleUpdateModalCancel = () => setIsUpdateModalVisible(false);

  //function to handle the update modal
  const handleUpdateModal = (image: any) => {
    setIsUpdateModalVisible(true);
    setUpdateImage(image);
  }
  //function to delete an image
  const deleteImage = async (id: string) => {
    try {
      const result = await serviceImage.delete(id);
      console.log(result);
      setImages(images.filter(image => image.id !== result.id));
    } catch (error) {
      console.log(error);
    }
  };
  //function to update an image
  const handleSubmit = async (image: Image) => {
    try {
      setIsUpdateModalVisible(false);
      const result: any = await serviceImage.update(image);
      console.log(result);
      if (result) {
        setImages(images.map(image => image.id === result.value._id ? result.value : image));
      }

    } catch (error) {
      console.log(error);
    }
  };
  //function to handle the upload modal form
  const uploadFile = async (values: any) => {
    const data = new FormData();
    const name = values.file.name.split('.')[0];
    data.append('file', values.file);
    data.append('name', name);
    try {
      const response = await serviceImage.save(data);
      console.log('response', response);
      const uploadImage = {
        id: response.insertedId,
        name,
        filename: values.file.name,
      }
      setNewImage(uploadImage);
      setImages([...images, newImage]);
      setNewImage({});
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const server = process.env.REACT_APP_API_URL || 'http://localhost:3456/';

  //function to get all images
  const hook = () => {
    (async () => {
      try {
        const images = await serviceImage.getAll();
        const imagesToShow = images.map(image => {
          // image.url = `${server}/images/${image.filename}`
          image.url = `${server}/images/${image.filename}`
          console.log('api_url',image.url);
          return image;
        })
        setImages(imagesToShow);
      } catch (error) {
        console.log(error);
      }
    })()
  }

  React.useEffect(hook, [newImage, images]);


  return (
    <Layout className="App"
      style={{
        background: 'linear-gradient(283deg, rgba(102,255,255,1) 26%, rgba(246,242,211,1) 42%)'
      }}>
      <Header style={{ fontFamily: 'monospace' }} className="App-header">
        <p >
          mis imágenes favoritas
        </p>
        <Button type="text" shape="round" icon={<PlusCircleOutlined />} onClick={() => setIsModalVisible(true)}>Añade una imagen</Button>
      </Header>
      <Content className="App-body">
        <ImageModal
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          uploadFile={uploadFile}
        />
        <ImageList images={images}
          deleteImage={deleteImage}
          handleUpdate={handleUpdateModal}
        />
        <UpdateModal
          handleOk={handleUpdateModalOk}
          handleCancel={handleUpdateModalCancel}
          handleSubmit={handleSubmit}
          isUpdateModalVisible={isUpdateModalVisible}
          updateImage={updateImage} />
      </Content>
    </Layout>
  );
};
