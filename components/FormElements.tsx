import { TextFieldElement } from "./fields/TextField";

export type ElementsType="TextField";

export type FormElement={
    type: ElementsType;

construct:(Id:string)=>FormElementIstance;


designerBtnElement:{
    icon:React.ElementType;
    label:string;
}


    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
};

export type FormElementIstance={
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}


type FormElementsType={
    [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType={
    TextField:TextFieldElement,
}
