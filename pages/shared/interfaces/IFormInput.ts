export interface IFormInput {
    inputType: InputType,
    content: ITextInputContent | ICheckboxContent,
    render: React.JSX.Element
};

export interface ITextInputContent {
    id: string,
    placeholder: string, 
    inputMode: string
};

export interface ICheckboxContent {

};

export enum InputType {
    TextInput,
    CheckBox,
    RadioButton,
}