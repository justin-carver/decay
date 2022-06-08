export interface IInputAction {
    name: string;
    action(...params: any): void;
}

export interface IInput {
    inputActions: IInputAction[];
    createNewInputAction(input: IInputAction): void;
    createInput(): IInput; // Should really be named something else...
    queueAction(action: string, ...params: any): void;
}

const Input: IInput = {
    inputActions: [],
    createNewInputAction: (input: IInputAction): void => {
        Input.inputActions.push({ ...input });
    },
    createInput: () => {
        return Input;
    },
    queueAction: (action: string, param: any) => {
        Input.inputActions.filter((actArrEl) => actArrEl.name === action)[0].action(param);
    },
};

Object.preventExtensions(Input);
export default Input;
