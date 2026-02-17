export interface SignupErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    accepted?: string;
    submit?: string;
}
export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    accepted: boolean;
}
