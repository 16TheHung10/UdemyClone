import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResponsePage from "components/ResponsePage/ResponsePage";
import { confirmEmail } from "apis/features/CommonAPI/AuthApi";

const generateObject = (status, title, subTitle, textButton, link) => {
  return {
    status,
    title,
    subTitle,
    textButton,
    link,
  };
};

const VerificationEmailPage = () => {
  const [objectRender, setObjectRender] = useState("");
  const location = useLocation();

  const generateMessage = async () => {
    const strToken = location.search.substring(
      location.search.lastIndexOf("token=") + 6
    );

    const userId = new URLSearchParams(location.search).get("userId") ?? "";

    try {
      const response = await confirmEmail(strToken, userId);
      if (response?.data?.isSuccess) {
        setObjectRender(
          generateObject(
            "success",
            `Thank You`,
            "Your account has been active. You can login right now.",
            "Sign in now",
            `/sign-in?email=${new URLSearchParams(location.search)
              .get("email")
              ?.toString()}&name=${new URLSearchParams(location.search)
              .get("name")
              ?.toString()}`
          )
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setObjectRender(
          generateObject(
            "failed",
            "Sorry",
            error.response.data.message,
            "Go to Homepage",
            "/"
          )
        );
        return;
      }
      setObjectRender(
        generateObject("failed", "Sorry", error.message, "Go to Homepage", "/")
      );
    }
  };

  useEffect(() => {
    (async () => {
      generateMessage();
    })();
  }, []);

  return <ResponsePage {...objectRender} />;
};

export default VerificationEmailPage;
