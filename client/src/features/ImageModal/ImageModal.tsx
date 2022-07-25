import './ImageModal.css';
import { Modal,Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';

export function ImageModal(props: any) {
    const backgroundColor = 'rgba(246,242,211,0.5)';
    const modalProps = {
        visible:props.isModalVisible,
        width:1000,
        footer:null,
        onCancel:props.handleCancel,
        bodyStyle:{
            top: 20,
            backgroundColor
        }
    }
    const uploadProps = {
        name:"files",
        customRequest:props.uploadFile,
        showUploadList:false,
        action:(file:File) => `${process.env.REACT_APP_API_URL}/api/image/${file.name}`,
        multiple:false,
        style:{backgroundColor}
    }

    return (
        <Modal {...modalProps}>
            <Upload.Dragger {...uploadProps}>
                <p>
                    <InboxOutlined />
                </p>
                <p style={{
                    fontFamily: 'monospace',
                    color: '#666'}}>
                        Haz click o arrastra una imagen a este recuadro
                </p>
            </Upload.Dragger>
        </Modal>
    )
}