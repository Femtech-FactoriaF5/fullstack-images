/// <reference types="react-scripts" />
interface Image {
    id?: string;
    name?: string;
    filename?: string;
    file?: File;
    url?:string;
    isUpdating?:boolean;
}