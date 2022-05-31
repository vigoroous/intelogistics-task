import React from 'react';
import { Row, Col, Layout } from "antd";
import { Provider } from 'react-redux';

import './App.css';
import 'leaflet/dist/leaflet.css';

import RequestTable from 'components/RequestTable';
import MapComponent from 'components/MapComponent';

import configureStore, { sagaMiddleware } from 'store';
import rootSage from "store/sagas";

const store = configureStore();
sagaMiddleware.run(rootSage);

function App() {
  return (
    <Provider store={store}>
      <Row gutter={10} className="App">
        <Col span={12}>
          <RequestTable />
        </Col>
        <Col span={12}>
          <MapComponent />
        </Col>
      </Row>
    </Provider>
  );
}

export default App;
