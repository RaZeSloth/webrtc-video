import React from "react";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import "../App.css";
const RuumiNupp = () => {
    const navigate = useNavigate();

    function Create() {
        const id = uuid();
        navigate(`/room/${id}`);
    }

    return (
        <div style={{ margin: "auto", width: "100px", height: "100px", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, textAlign: "center", wordWrap: "break-word", wordBreak: "break-word", whiteSpace: "pre" }}>
        <button onClick={Create}>Tee uus ruum!</button>
        </div>
    );
};

export default RuumiNupp;
