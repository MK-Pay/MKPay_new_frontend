import { DefineComponent } from 'vue';

interface SecondaryButtonProps {
    type?: 'button' | 'submit' | 'reset';
}

declare const SecondaryButton: DefineComponent<SecondaryButtonProps>;

export default SecondaryButton;
