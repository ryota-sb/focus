import ReactPlayer from "react-player";

interface Props {
  isPlay: boolean;
}

const YoutubePlayer = ({ isPlay }: Props) => {
  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=4xDzrJKXOOY"
        width={0}
        height={0}
        controls
        playing={isPlay}
        config={{
          youtube: {
            embedOptions: {
              host: "https://www.youtube-nocookie.com",
            },
          },
        }}
      />
    </>
  );
};

export { YoutubePlayer };
