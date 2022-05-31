import { Row, Col } from "antd";
import { Provider } from 'react-redux';
import L from "leaflet";

import './App.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';

import RequestTable from 'components/RequestTable';
import MapComponent from 'components/MapComponent';

import configureStore, { sagaMiddleware } from 'store';
import rootSage from "store/sagas";
import EditRequestModal from "components/EditRequestModal";
import { ToastContainer } from "react-toastify";
import DraggableDivider from "components/DraggableDivider";
import { useRef } from "react";

const store = configureStore();
sagaMiddleware.run(rootSage);

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Provider store={store}>
      <Row gutter={10} style={{margin: 0, padding: '1rem'}}>
        <Col
          style={{
            overflow: 'auto',
            width: '50vw'
          }}
          ref={divRef}
        >
          <RequestTable />
        </Col>
        <Col>
          <DraggableDivider outerDiv={divRef} />
        </Col>
        <Col flex={'auto'}>
          <MapComponent />
        </Col>
      </Row>
      <EditRequestModal />
      <ToastContainer />
    </Provider>
  );
}

export default App;
