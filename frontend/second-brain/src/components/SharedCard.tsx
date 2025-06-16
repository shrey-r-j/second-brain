import { DocIcon } from "../icons/DocIcon";
import { TwitterIcon } from "../icons/TwiiterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface SharedCardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
}

export default function SharedCard(props: SharedCardProps) {
  return (
    <div className="p-8 bg-white rounded-md shadow-md border-gray-300 max-w-72 border min-h-48 min-w-72 m-4">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            {props.type === "youtube" && <YoutubeIcon />}
            {props.type === "twitter" && <TwitterIcon />}
            {props.type === "document" && <DocIcon />}
          </div>
          {props.title}
        </div>
      </div>
      <div className="pt-4">
        {props.type === "youtube" && (
          <iframe
            className="w-full m-2"
            src={props.link.replace("watch", "embed").replace("/v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {props.type === "twitter" && (
          <blockquote className="twitter-tweet w-full m-2">
            <a href={props.link.replace("x.com", "twitter.com") + "?ref_src=twsrc%5Etfw"}></a>
          </blockquote>
        )}

        {props.type === "document" && (
          <a
            className="text-blue-600 underline"
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </a>
        )}
      </div>
    </div>
  );
}
