import { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Typography } from 'antd';

const { Header, Sider, Content } = Layout;

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// getTabHost 用于获取当前 tab 的 host
function getTabHost(tab: chrome.tabs.Tab) {
  // 处理 tab 不存在的情况
  if (tab == undefined || !tab.url) {
    return "";
  }

  const url = new URL(tab.url);
  return url.host;
}

// getSLD 用于获取当前 tab 的 SLD (Second Level Domain)，例如：www.baidu.com 的 SLD 为 baidu.com
function getSLD(tab: chrome.tabs.Tab) {
  // 处理 tab 不存在的情况
  if (tab == undefined || !tab.url) {
    return "";
  }

  const url = new URL(tab.url);
  const host = url.host;
  const hostParts = host.split(".");
  const sld = hostParts.slice(-2).join(".");
  return sld;
}

// TabInfo 组件用于展示当前 tab 的信息, 传入的参数包含一个 tab 对象
function TabInfo({tab, setTab}) {
  return (
    <div
      // add style for layout container, let it can adjust size by content
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Typography>
        <pre>Tab Title: {tab == undefined  ? "" : tab.title}</pre>
        <pre>Tab URL: {tab == undefined  ? "" : tab.url}</pre>
        <pre>Tab Host: {getTabHost(tab)}</pre>
        <pre>Tab SLD: {getSLD(tab)}</pre>
      </Typography>
    </div>
  )
}

function IndexPopup() {
  // 定义一个 tab 的 state, 用于存储当前的 tab 信息，初始化为 chrome.tabs.Tab 类型，避免报错
  const [tab, setTab] = useState({} as chrome.tabs.Tab)
  // 定义一个 collapsed 的 state, 用于存储当前的侧边栏是否收起，初始化为 true
  const [collapsed, setCollapsed] = useState(true);
  // Select 的 options
  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
    },
    {
      key: '2',
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
  const [currentOptionKey, setCurrentOptionKey] = useState('1');

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
            margin: '24px 16px',
            padding: 24,
            minHeight: 300,
            background: colorBgContainer,
          }}
        >
          <TabInfo tab={tab} setTab={setTab}  />
        </Content>
      </Layout>
    </Layout>
  );
}

export default IndexPopup
