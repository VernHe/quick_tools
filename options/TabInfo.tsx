import { Typography } from 'antd';

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

export default TabInfo;