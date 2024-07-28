<script setup lang="ts">
import { useWebSocket } from "@vueuse/core";

const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);
let localStream: MediaStream;
let peerConnection: RTCPeerConnection;
const BASEURL = useRequestURL();
const signalingURL = `${BASEURL.protocol === "http:" ? "ws" : "wss"}://${BASEURL.host}/webrtc/signaling`;

const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

const { status, data, send, close, open } = useWebSocket(signalingURL, {
  immediate: false,
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      console.log("Failed to connect WebSocket after 3 retries");
    },
  },
});

watch(status, (newData) => {
  console.log(" rtc status:", newData);
});

watch(data, (newData) => {
  try {
    const data = JSON.parse(newData);
    handleWebSocketMessage(data);
  } catch (error) {
    console.error("Failed to parse incoming message", error, newData);
  }
});

onMounted(() => {
  open();
  // Initialize remote stream
  peerConnection = new RTCPeerConnection(iceServers);
  peerConnection.ontrack = ({ streams }) => {
    if (remoteVideo.value) {
      remoteVideo.value.srcObject = streams[0];
    }
  };
});

onBeforeUnmount(() => {
  if (status.value === "OPEN") {
    close();
  }
  handleLeave();
});

const handleWebSocketMessage = async (data: any) => {
  switch (data.type) {
    case "offer": {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      send(JSON.stringify({ type: "answer", answer }));
      break;
    }

    case "answer":
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
      break;

    case "candidate": {
      const candidate = new RTCIceCandidate(data.candidate);
      await peerConnection.addIceCandidate(candidate);
      break;
    }

    case "leave":
      handleLeave();
      break;

    default:
      break;
  }
};
const startCall = async () => {
  open();
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideo.value) {
      localVideo.value.srcObject = localStream;
    }

    peerConnection = new RTCPeerConnection(iceServers);

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        send(JSON.stringify({ type: "candidate", candidate }));
      }
    };

    peerConnection.ontrack = ({ streams }) => {
      if (remoteVideo.value) {
        remoteVideo.value.srcObject = streams[0];
      }
    };

    localStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, localStream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    send(JSON.stringify({ type: "offer", offer }));
  } catch (error) {
    console.error("Error starting call:", error);
  }
};

const enterRoom = async () => {
  try {
    peerConnection = new RTCPeerConnection(iceServers);

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        send(JSON.stringify({ type: "candidate", candidate }));
      }
    };

    peerConnection.ontrack = ({ streams }) => {
      if (remoteVideo.value) {
        remoteVideo.value.srcObject = streams[0];
      }
    };
  } catch (error) {
    console.error("Error entering room:", error);
  }
};

const endCall = () => {
  handleLeave();
  if (status.value === "OPEN") {
    send(JSON.stringify({ type: "leave" }));
  }
};

const toggleAudio = () => {
  const audioTracks = localStream.getAudioTracks();
  if (audioTracks.length > 0) {
    audioTracks[0].enabled = !audioTracks[0].enabled;
  }
};

const toggleVideo = () => {
  const videoTracks = localStream.getVideoTracks();
  if (videoTracks.length > 0) {
    videoTracks[0].enabled = !videoTracks[0].enabled;
  }
};

const handleLeave = () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
};
</script>

<template>
  <div class="flex bg-white h-full flex-col">
    <div class="flex mb-4 bg-gray-300 h-full w-full flex-col">
      <video ref="remoteVideo" class="rounded shadow-lg" autoplay playsinline />
      <video
        ref="localVideo"
        class="rounded shadow-lg w-1/3 m-auto"
        autoplay
        playsinline
      />
    </div>
    <!-- Control buttons -->
    <div
      class="flex gap-3 absolute bottom-0 w-full text-xs text-white left-0 right-0"
    >
      <button
        class="bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded"
        @click="startCall"
      >
        Start Stream
      </button>
      <button
        class="bg-indigo-500 hover:bg-indigo-700 font-bold py-1 px-2 rounded"
        @click="enterRoom"
      >
        Enter Room
      </button>
      <button
        class="bg-red-500 hover:bg-red-700 font-bold py-1 px-2 rounded"
        @click="endCall"
      >
        End Stream
      </button>
      <button
        class="bg-yellow-500 hover:bg-yellow-700 font-bold py-1 px-2 rounded"
        @click="toggleAudio"
      >
        Mute Audio
      </button>
      <button
        class="bg-green-500 hover:bg-green-700 font-bold py-1 px-2 rounded"
        @click="toggleVideo"
      >
        Mute Video
      </button>
    </div>
  </div>
</template>
