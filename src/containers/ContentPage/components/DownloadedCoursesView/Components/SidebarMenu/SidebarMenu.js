import { ReactComponent as PlayIcon } from "assets/svg/play.svg";
import { ReactComponent as FileText } from "assets/svg/file-text.svg";
import { ReactComponent as Questions } from "assets/svg/question.svg";
import { Menu, Popover, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SidebarMenuWraper } from "./SidebarStyled";
import { saveAs } from "file-saver";
import { ReactComponent as Attachment } from "assets/svg/new-tab.svg";
import { Link } from "react-router-dom";
import { getItem } from "layout/LayoutUtils";
export default function SidebarMenu({
  menuList,
  selectedLecture,
  handleSelectLecture,
  courseID,
  location,
  handleSelectLectureByParam,
  handleHideSideBar,
}) {
  const testRef = useRef(false);
  const [currentOpenKey, setCurrentOpenKey] = useState([]);
  const handleDowloadAttachment = (url, name) => {
    saveAs(url, name);
  };
  const TypeLectureIcon = (Component) => {
    return (
      <Component
        className="lecture-icon"
        width={20}
        height={20}
        fill="#aba6a6"
      />
    );
  };
  const fileContent = (attachments) => (
    <div>
      {attachments?.map((attachment, index) => {
        return (
          <p
            key={`attachments-${index}`}
            onClick={() => {
              handleDowloadAttachment(attachment.url, attachment.name);
            }}
            style={{ cursor: "pointer" }}
          >
            {attachment.name}
          </p>
        );
      })}
    </div>
  );
  const renderChildrenIcon = (type) => {
    switch (type) {
      case "assignment":
        return TypeLectureIcon(FileText);
      case "lecture":
        return TypeLectureIcon(PlayIcon);
      case "quiz":
        return TypeLectureIcon(Questions);
      default:
        return;
    }
  };

  const renderItem = () => {
    //render item value
    const html = menuList?.map((section) => {
      return getItem(
        //title
        section.newData.length === 0 ? (
          <Tooltip title="This section is emty">
            <span>{section.title}</span>
          </Tooltip>
        ) : (
          section.title
        ),
        //key
        section.id,
        //icon
        "",
        //children
        section.newData
          ?.sort((a, b) => a.ordinalNumber - b.ordinalNumber)
          .map((lecture) => {
            return getItem(
              //children title
              <Link
                to={`/download-course-view/${courseID}#${lecture.id
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replaceAll(" ", "-")}`}
                style={{}}
                className="menu-lecture-title link-sidebar"
              >
                <Tooltip title={lecture.title}>
                  <p className="menu-lecture-title">{lecture.title}</p>
                </Tooltip>
                {lecture.attachments?.length !== 0 && lecture.attachments && (
                  <Popover
                    content={fileContent(lecture.attachments)}
                    title="Attachment"
                    style={{ textAlign: "left" }}
                  >
                    <Attachment
                      className="attachment-icon"
                      height={21}
                      width={21}
                      fill="#aba6a6"
                      // fill="red"
                    />
                  </Popover>
                )}
              </Link>,

              //children key
              lecture.id,

              //children icon
              renderChildrenIcon(lecture.type)
            );
          })
      );
    });
    return html;
  };
  const onClickMenuItem = (e) => {
    //key && keypath[0] : lecture id;
    //keypath[1]: section id;
    handleSelectLecture(e.keyPath[1], e.keyPath[0]);
    const find = currentOpenKey.find((item) => item === e.keyPath[1]);
    if (find === -1) {
      setCurrentOpenKey([...currentOpenKey, find]);
    }
    handleHideSideBar();
    window.scrollTo(0, 0);
  };
  const handleOnOpenChange = (e) => {
    //e : sectionID[];
    setCurrentOpenKey(e);
  };

  useEffect(() => {
    //handle selected key of menu
    let indexOfCurrentSection;
    if (menuList) {
      indexOfCurrentSection = menuList.findIndex((section) => {
        for (let lecture of section.newData) {
          if (lecture.id === selectedLecture?.id) {
            return true;
          } else {
            continue;
          }
        }
        return false;
      });

      const find = currentOpenKey.find(
        (item) => item === menuList[indexOfCurrentSection]?.id
      );

      if (find) {
        return;
      } else {
        setCurrentOpenKey((currentOpenKey) => [
          ...currentOpenKey,
          menuList[indexOfCurrentSection]?.id,
        ]);
      }
    }
  }, [selectedLecture?.id, menuList, currentOpenKey]);
  useEffect(() => {
    testRef.current = true;
  }, []);
  useEffect(() => {
    //handle set selected lecture by param
    if (testRef.current === true && menuList) {
      if (location.hash) {
        let foundLecture;
        for (let lecture of menuList) {
          foundLecture = lecture.newData.find((item) => {
            return item.id === location.hash.replace("#", "");
          });
          if (foundLecture) {
            break;
          }
        }
        handleSelectLectureByParam(foundLecture);
      }
    }
  }, [location.hash, handleSelectLectureByParam, menuList]);

  return (
    <SidebarMenuWraper>
      {currentOpenKey && (
        <Menu
          onClick={onClickMenuItem}
          onOpenChange={handleOnOpenChange}
          openKeys={currentOpenKey}
          selectedKeys={[selectedLecture?.id]}
          mode="inline"
          items={renderItem()}
        />
      )}
    </SidebarMenuWraper>
  );
}
