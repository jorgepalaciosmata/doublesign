import React from 'react'
import TextBoxCom from "../../shared/components/TextBox/TextBoxComp";
import { IFormInput, InputType } from '../interfaces/IFormInput';
import { useState } from 'react'

export const useFormInput = (inputs: IFormInput[], data: {}, 
    setData: React.Dispatch<React.SetStateAction<{}>>) => {

    inputs.forEach((input, key) => {
		switch(input.inputType) {
		  case InputType.TextInput:
			input.render = <TextBoxCom
							  key={key}
							  content={input.content}
							  data={data}
							  setData={setData} />
			break;
		  default:	
			break;
		}
	});

    return inputs;
}
