import { Space } from "antd";
import { ReactComponent as FacebookIcon } from "assets/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "assets/svg/linkedin2.svg";
import { ReactComponent as TwitterIcon } from "assets/svg/twitter.svg";
import { ReactComponent as YoutubeIcon } from "assets/svg/youtube.svg";
import React from "react";
import SocialsGroupActionWrapper from "./SocialsGroupActionStyled";

function SocialsGroupAction(props) {
  const { facebook, youtube, twitter, linkedin } = props;

  const openNewTabClick = (link) => {
    console.log("123");
    window.open(link);
  };
  return (
    <SocialsGroupActionWrapper>
      <Space size={8} className="socials-group-action_wrap">
        {facebook && (
          <span onClick={() => openNewTabClick(facebook)}>
            <FacebookIcon className="socials-group-action_icon socials-group-action_facebook-icon" />
          </span>
        )}
        {twitter && (
          <span
            onClick={() => openNewTabClick(twitter)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="socials-group-action_icon socials-group-action_twitter-icon" />
          </span>
        )}
        {linkedin && (
          <span
            onClick={() => openNewTabClick(linkedin)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="socials-group-action_icon socials-group-action_linkedin-icon" />
          </span>
        )}
        {youtube && (
          <span
            onClick={() => openNewTabClick(youtube)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon className="socials-group-action_icon socials-group-action_youtube-icon" />
          </span>
        )}
      </Space>
    </SocialsGroupActionWrapper>
  );
}

export default SocialsGroupAction;
