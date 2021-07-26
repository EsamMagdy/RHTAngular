import { ContractStepsEnum, StepTypeEnum } from "./individualContractReq.model";

export class LocalStorageKeys {
    static stepData = 'stepData';
    static indvContractReq = 'indvContractReq';
    static indvContractCreated = 'indvContractCreated';
    static language = 'lang';
    static userData = 'userData';
    static stepId = "stepId";
    static registerData = "registerData";
    static loginData = "loginData";
    static phoneNumber = "phoneNumber";
}

export interface StepDataLocalStorage {
    stepId: string;
    currentStep: ContractStepsEnum;
    stepType: StepTypeEnum;
}

export class LocalStorage {
    private static ls: { [key: string]: string; } = {
        stepData: LocalStorageKeys.stepData,
        indvContractReq: LocalStorageKeys.indvContractReq,
        userData: LocalStorageKeys.userData,
        stepId: LocalStorageKeys.stepId,
        registerData: LocalStorageKeys.registerData,
        loginData: LocalStorageKeys.loginData,
        resetPassword: LocalStorageKeys.phoneNumber
    }

    static getKeyValue(key: string) {
        return this.ls[key];
    }
    static getAllKeyValues() {
        return this.ls;
    }
    static removeAllLocalStorage() {
        Object.keys(this.ls).forEach(key => {
            localStorage.removeItem(key); // the value of the current key.
        });
    }
}
