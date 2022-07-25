import {
    List,
    Button,
    Image,
    Card,
    Space,
} from 'antd';
import { EditOutlined, DeleteOutlined, ZoomInOutlined } from '@ant-design/icons';

export default function ImageList(props: any) {
    return (
        <List className="image-list"
            grid={{
                gutter: 4,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 4,
            }}
            dataSource={props.images}
            renderItem={(image: any, index: any) => (
                <List.Item>
                    <Card
                        hoverable
                        style={{ backgroundColor: 'rgba(246, 242, 211, 0.75)', paddingTop: '40px' }}

                        cover={<Image width={300}
                            id={image._id}
                            src={image.url}
                            alt={image.name}
                            style={{ filter: 'sepia(60%)' }}
                            preview={{
                                maskClassName: 'customize-mask',
                                mask: (
                                    <Space direction="vertical" align="center">
                                        <ZoomInOutlined />
                                        <p>{image.name}</p>
                                    </Space>
                                ),
                                title: image.name,
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    background: '#fff',
                                    borderRadius: 4,
                                    padding: '0px',
                                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                                    border: '1px solid #e8e8e8',
                                    cursor: 'pointer',
                                },
                            }}
                        />
                        }

                    >
                        <Button type="text" icon={<DeleteOutlined />} onClick={() => props.deleteImage(image._id)} danger></Button>
                        <Button type="text" icon={<EditOutlined />}
                            onClick={() => props.handleUpdate(image)}
                        >
                        </Button>
                    </Card>
                </List.Item>
            )}
        />
    );
}
