import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const cssDiv = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
    overflow: hidden;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoPiirid = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const kasutajaVideo = useRef();
    const peersRef = useRef([]);
    const paramid = useParams()
    const ruumiID = paramid.roomID;
    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoPiirid, audio: true }).then(striim => {
            kasutajaVideo.current.srcObject = striim;
            socketRef.current.emit("join room", ruumiID);
            socketRef.current.on("all users", kasutajad => {
                const peers = [];
                kasutajad.forEach(userID => {
                    const peer = teePeer(userID, socketRef.current.id, striim);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", andmed => {
                const peer = lisaPeer(andmed.signal, andmed.callerID, striim);
                peersRef.current.push({
                    peerID: andmed.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", andmed => {
                const asi = peersRef.current.find(p => p.peerID === andmed.id);
                asi.peer.signal(andmed.signal);
            });
        })
    }, []);

    function teePeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signaal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal: signaal })
        })

        return peer;
    }

    function lisaPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signaal => {
            socketRef.current.emit("returning signal", { signal: signaal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <cssDiv>
            <StyledVideo muted ref={kasutajaVideo} autoPlay playsInline />
            {peers.map((peer, indeks) => {
                return (
                    <Video key={indeks} peer={peer} />
                );
            })}
        </cssDiv>
    );
};

export default Room;
