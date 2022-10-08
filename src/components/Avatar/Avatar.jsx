import React from "react";
import AvatarWrapper, {AvatarStringWrapper} from "./AvatarStyled";
import StringUtils from "utils/StringUtils";
import { Avatar as AvatarAnt } from "antd";

function Avatar(props) {
  const { imgLink: avatar, style, fullName } = props;
  if (avatar !== null) {
    return (
      <AvatarWrapper
        style={style}
        className="instructor-card_img"
        src={avatar}
        alt=""
      />
    );
  } else {
    return (
      <AvatarStringWrapper>
        <AvatarAnt
          className="instructor-card_img"
          size={100}
          style={style}
        >
          {StringUtils.generateAvatar(fullName)}
        </AvatarAnt>
      </AvatarStringWrapper>
    );
  }
}

export default Avatar;
