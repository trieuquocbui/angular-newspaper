import { AbstractControl, ValidationErrors } from "@angular/forms";

export default function ValidationComparePassword(controls:AbstractControl): ValidationErrors | null{
    const controlPasswrod = controls.get('password');
    const controlConfirmPasswrod = controls.get('confirmPassword');
    if(controlPasswrod?.value !== controlConfirmPasswrod?.value){
        controlConfirmPasswrod?.setErrors({ matching: true });
        return { matching: true };
    } else{
        return null;
    }
}