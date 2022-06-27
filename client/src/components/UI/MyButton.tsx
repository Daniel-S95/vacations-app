import { Button, SemanticCOLORS, SemanticSIZES } from 'semantic-ui-react';

type Props = {
    value: string;
    onClick: () => void;
    isDisabled?: boolean;
    style?: {};
    size?: SemanticSIZES;
    color?: SemanticCOLORS;
}

const MyButton = (props: Props) => {

    return (
        <Button style={props.style} color={props.color ? props.color : "orange"} size={props.size ? props.size : "medium"} onClick={props.onClick} disabled={props.isDisabled}>{props.value}</Button>
    )
}

export default MyButton;