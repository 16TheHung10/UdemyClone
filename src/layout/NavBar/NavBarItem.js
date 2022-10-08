import { Menu } from 'antd';
import { getItem } from 'layout/LayoutUtils';

export const menu = (
  <Menu
    items={[
      getItem('Development', '1'),
      getItem('Business', '2'),
      getItem('Finace & Accounting', '3'),
      getItem('IT & Software', '4'),
      getItem('Office Productivity', '5'),
      getItem('Persional Development', '6'),
      getItem('Design', '7'),
      getItem('Marketing', '8'),
      getItem('Lifestyle', '9'),
      getItem('Photography', '10'),
      getItem('Health & Fitness', '11'),
      getItem('Music', '12'),
      getItem('Teaching & Academics', '13'),
    ]}
  />
);
