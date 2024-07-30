// import * as cookie from "cookie";
export default defineWebSocketHandler({
  upgrade: (req) => {
    // const cookies = cookie.parse(req.headers.cookie || "");
    // console.log(`[ws] upgrading ${req.url} :`, cookies.userPub);
  },
  open: (peer) => {
    // const cookies = cookie.parse(peer.headers.cookie || "");
    // console.log(`[ws] open: ${cookies.userPub}`);
    peer.subscribe("meeting");
  },

  message: (peer, message: string) => {
    // const cookies = cookie.parse(peer.headers.cookie || "");
    // console.log(`[ws] message from  :`, message);
    const data = JSON.parse(message);

    switch (data.type) {
      case "offer":
        handleOffer(peer, data.offer);
        break;
      case "answer":
        handleAnswer(peer, data.answer);
        break;
      case "candidate":
        handleCandidate(peer, data.candidate);
        break;
      case "leave":
        handleLeave(peer);
        break;
      default:
        console.log("Unknown message type:", data.type);
        break;
    }
  },

  close: (peer, event: CloseEvent) => {
    console.log("[ws] close", peer, event);
  },

  error: (peer, error: Error) => {
    console.log("[ws] error", peer, error);
  },
});

const handleOffer = (peer, offer: RTCSessionDescriptionInit) => {
  peer.publish(
    "meeting",
    JSON.stringify({
      type: "offer",
      offer,
      peer: peer.id,
    })
  );
};

const handleAnswer = (peer, answer: RTCSessionDescriptionInit) => {
  peer.publish(
    "meeting",
    JSON.stringify({
      type: "answer",
      answer,
      peer: peer.id,
    })
  );
};

const handleCandidate = (peer, candidate: RTCIceCandidateInit) => {
  peer.publish(
    "meeting",
    JSON.stringify({
      type: "candidate",
      candidate,
      peer: peer.id,
    })
  );
};

const handleLeave = (peer) => {
  peer.publish(
    "meeting",
    JSON.stringify({
      type: "leave",
      peer: peer.id,
    })
  );
};
