import { MDBBadge } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

type Props = { amount: number }

const Likes = (props: Props) => {
    const [likesCount, setLikesCount] = useState(props.amount);

    useEffect(() => {
        setLikesCount(props.amount);
    }, [props.amount]);

    return (
        <MDBBadge color='danger' style={{ fontSize: "0.8rem" }} notification pill>
            {likesCount}
        </MDBBadge>
    );
}

export default Likes;