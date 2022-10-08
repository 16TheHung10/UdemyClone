import Wrapper from "./UpcomingCoursesStyle";
import { Table } from 'antd';
import clsx from "clsx";
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

function UpcomingCourses() {
  const columns = [
    {
      title: (<div className="headerTable"><span>Item No</span></div>),
      dataIndex: 'itemNo',
      key: 'itemNo',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: (<div className="headerTable"><span>Title</span></div>),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: (<div className="headerTable"><span>Thumbnail</span></div>),
      dataIndex: 'thumbnail',
      key: 'thumbnail',
    },
    {
      title: (<div className="headerTable"><span>Category</span></div>),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: (<div className="headerTable"><span>Price</span></div>),
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: (<div className="headerTable"><span>Date</span></div>),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: (<div className="headerTable"><span>Status</span></div>),
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span className="statusContent active">{text}</span>,
    },
    {
      title: (<div className="headerTable"><span>Action</span></div>),
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div className="actionContent">
          {/* <a>Invite {record.key}</a> */}
          <EditOutlined onClick={e=>console.log(record.key)} className="iconAction"/>
          <DeleteOutlined onClick={e=>console.log(record.key)} className="iconAction"/>
        </div>
      )
    }
  ];
  // Not have data
  const data = [
  
  ];

  return (
    <Wrapper>
      <Table columns={columns} dataSource={data} />
      {data.length===0&&(<span>No courses available</span>)}
    </Wrapper>
  );
}

export default UpcomingCourses;
