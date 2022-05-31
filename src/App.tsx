import { Row, Col } from "antd";
import { Provider } from 'react-redux';
import L from "leaflet";

import './App.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import RequestTable from 'components/RequestTable';
import MapComponent from 'components/MapComponent';

import configureStore, { sagaMiddleware } from 'store';
import rootSage from "store/sagas";

const store = configureStore();
sagaMiddleware.run(rootSage);

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  return (
    <Provider store={store}>
      <Row gutter={10} style={{margin: 0, padding: '1rem'}}>
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
