import { Pagination } from "antd";
import React from "react";
import Card from "./Card/Card";
import { RightContentStyled } from "./RightContentStyled";

export default function RightContent() {
  const data = [
    {
      describe: {
        date: " March 10, 2022",
        view: "109K",
        title: "Blog Title Here",
        summary:
          "Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.",
      },
      img: "https://gambolthemes.net/html-items/cursus_main_demo/images/blog/img-1.jpg",
    },
    {
      describe: {
        date: " March 10, 2022",
        view: "109K",
        title: "Blog Title Here",
        summary:
          "Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.",
      },
      img: "https://gambolthemes.net/html-items/cursus_main_demo/images/blog/img-1.jpg",
    },
    {
      describe: {
        date: " March 10, 2022",
        view: "109K",
        title: "Blog Title Here",
        summary:
          "Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.",
      },
      img: "https://gambolthemes.net/html-items/cursus_main_demo/images/blog/img-1.jpg",
    },
    {
      describe: {
        date: " March 10, 2022",
        view: "109K",
        title: "Blog Title Here",
        summary:
          "Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.",
      },
      img: "https://gambolthemes.net/html-items/cursus_main_demo/images/blog/img-1.jpg",
    },
    {
      describe: {
        date: " March 10, 2022",
        view: "109K",
        title: "Blog Title Here",
        summary:
          "Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.",
      },
      img: "https://gambolthemes.net/html-items/cursus_main_demo/images/blog/img-1.jpg",
    },
    {
      describe: {
        date: " March 10, 2022",
        view: "109K",
        title: "Blog Title Here",
        summary:
          "Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.",
      },
      img: "https://gambolthemes.net/html-items/cursus_main_demo/images/blog/img-1.jpg",
    },
  ];
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <RightContentStyled>
      {data.map((item, index) => {
        return <Card key={index} img={item.img} describe={item.describe} />;
      })}
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={500}
        onChange={onChange}
      />
    </RightContentStyled>
  );
}
