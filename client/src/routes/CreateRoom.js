import React from "react";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
const CreateRoom = () => {
    const navigate = useNavigate();

    function Create() {
        const id = uuid();
        navigate(`/room/${id}`);
    }

    return (
        <button onClick={Create}>Tee uus ruum!</button>
    );
};

export default CreateRoom;
