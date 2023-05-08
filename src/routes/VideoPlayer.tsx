import React from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
}

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = ({
  src,
  className,
  loop = false,
  muted = false,
  autoPlay = false,
}) => {
  return (
    <video
      src={src}
      className={className}
      loop={loop}
      muted={muted}
      autoPlay={autoPlay}
    />
  );
};

export default VideoPlayer;
