"use client";

import { ElementsType, FormElement } from "../FormElements";
import{MdTextFields} from "react-icons/md";
const type :ElementsType= "TextField";

export const TextFieldElement:FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            placeholder: "Value here ...",
            label: "Text Field",
            required: false,
            helpText:"Helper Text"
        },
    }),

    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent:()=><div>Designer Component</div>,
    formComponent:()=><div>Form Component</div>,
    propertiesComponent:()=><div>Properties Component</div>,
}