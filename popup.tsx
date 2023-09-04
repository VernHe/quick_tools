import { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Typography } from 'antd';
import TabInfo from './options/TabInfo';
import PhoneNumberList from './options/PhoneNumberList';

const { Header, Sider, Content } = Layout;

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function IndexPopup() {
  // 定义一个 tab 的 state, 用于存储当前的 tab 信息，初始化为 chrome.tabs.Tab 类型，避免报错
  const [tab, setTab] = useState({} as chrome.tabs.Tab)
  // 定义一个 collapsed 的 state, 用于存储当前的侧边栏是否收起，初始化为 true
  const [collapsed, setCollapsed] = useState(true);
  // Select 的 options
  const items = [
    {
      key: 'tab_info',
      icon: <UserOutlined />,
      label: 'tab info',
    },
    {
      key: 'phone number list',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ];
  // 当前选择的 option 的 key
  const [currentOptionKey, setCurrentOptionKey] = useState('tab_info');

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  getCurrentTab().then((t) => {
    setTab(t)
  })
  return (
    // add style for layout container, let it can adjust size by content
    <Layout style={{
      width: "700px",
      height: "400px",
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onClick={(e) => {
            console.log(e);
            setCurrentOptionKey(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '16px 16px',
            padding: 24,
            minHeight: 300,
            background: colorBgContainer,
          }}
        >
          { currentOptionKey === 'tab_info' && <TabInfo tab={tab} setTab={setTab} /> }
          { currentOptionKey === 'phone number list' && <PhoneNumberList /> }
        </Content>
      </Layout>
    </Layout>
  );
}

export default IndexPopup
