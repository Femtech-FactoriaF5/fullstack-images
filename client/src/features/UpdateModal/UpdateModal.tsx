import { useRef } from "react";
import { Modal,  Button } from "antd";

export default function UpdateModal(props:any) {

    const inputEl = useRef<HTMLInputElement>(props.updateImage.name);
    const backgroundColor = 'rgba(246,242,211,0.5)';
    const modalProps = {
        visible: props.isUpdateModalVisible,
        width: 1000,
        footer: null,
        onCancel: props.handleCancel,
        bodyStyle: {
            top: 20,
            backgroundColor
        }
    }

    return (
        <Modal {...modalProps}>
                    <input ref={inputEl} placeholder={props.updateImage.name} />
                    <Button type="text" onClick={()=>{
                        console.log(props.image);
                    if(inputEl.current){
                        props.handleSubmit({
                        ...props.updateImage,
                        name: inputEl.current.value,
                    });
                }}}>
                        Actualizar
                    </Button>
        </Modal>
    )

}