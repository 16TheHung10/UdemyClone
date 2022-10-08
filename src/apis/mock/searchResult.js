import { Space, Typography } from "antd";

export const toggleFilter = [
  {
    value: "category",
    title: `Category`,
    items: [
      {
        value: `seo`,
        label: "SEO",
        total: 0,
      },
      {
        value: `php`,
        label: "PHP",
        total: 0,
      },
      {
        value: `wordpress-pro`,
        label: "Wordpress Pro",
        total: 0,
      },
      {
        value: `bootstrap`,
        label: "Bootstrap",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "level",
    title: `Level`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "language",
    title: `Language`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "price",
    title: `Price`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "features",
    title: `Features`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "rating",
    title: `Rating`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "video-duration",
    title: `Video Duration`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
  {
    value: "close-caption",
    title: `Close Caption`,
    items: [
      {
        value: `all-levels`,
        label: "All Levels",
        total: 0,
      },
      {
        value: `beginner`,
        label: "Beginner",
        total: 0,
      },
      {
        value: `intermediate`,
        label: "Intermediate",
        total: 0,
      },
      {
        value: `expert`,
        label: "Expert",
        total: 0,
      },
    ],
    chooseIndex: 0,
  },
];

export const menu = [
  {
    value: "default",
    key: "default-1",
    row: (
      <Space>
        <Typography.Text className="sort-label">Sort</Typography.Text>
      </Space>
    ),
  },
  {
    value: "most-reviewed-1",
    key: "most-reviewed",
    row: (
      <Space>
        <Typography.Text className="sort-label">Most reviewed</Typography.Text>
      </Space>
    ),
  },
  {
    value: "highest-rated-2",
    key: "highest-rated",
    row: (
      <Space>
        <Typography.Text className="sort-label">Highest Rated</Typography.Text>
      </Space>
    ),
  },
  {
    value: "createdAt desc",
    key: "newest",
    row: (
      <Space>
        <Typography.Text className="sort-label">Newest</Typography.Text>
      </Space>
    ),
  },
  {
    value: "price",
    key: "lowest-price",
    row: (
      <Space>
        <Typography.Text className="sort-label">Lowest Price</Typography.Text>
      </Space>
    ),
  },
  {
    value: "price desc",
    key: "highest-price",
    row: (
      <Space>
        <Typography.Text className="sort-label">Highest Price</Typography.Text>
      </Space>
    ),
  },
];
