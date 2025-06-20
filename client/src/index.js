import React from 'react';
import ReactDOM from 'react-dom/client';
// import "antd/dist/reset.css";
import './index.css';
import App from './App';
import '@ant-design/v5-patch-for-react-19'; // Import the compatibility package
import { Provider } from 'react-redux';
import store from './redux/store';


// Use unstableSetRender method if necessary
import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';


unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  
);


