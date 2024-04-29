import React, { useState } from "react";
import Calendar from "./components/calendar/Calendar";
import NewData from "./components/submitData/NewData";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeviceConnect from "./components/device/DeviceConnect";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import LeftBlock from "./components/ui/LeftBlock";
import SharedAccess from './components/shared/SharedAccess';
import { useSerialPort } from './SerialPortContext';
import { DataProvider } from "./DataContext";

export default function App() {
  // const [newRequest] = useState(false);
  const [newRequest, setNewRequest] = useState(true);
  const { connectReadSerial, disconnectDevice, data, deviceConnected } = useSerialPort();
  const [newDataAvailable, setNewDataAvailable] = useState(true);

  return(
    <div>
      <Router>
        <DataProvider>
          <Routes>
            <Route exact path="/" element={
              <React.Fragment>
                <DeviceConnect onDeviceConnected={deviceConnected} onConnectSerial={connectReadSerial} />
              </React.Fragment>
            } />
            <Route path="/myrecords" element={
              <React.Fragment>
                <Header deviceConnected={deviceConnected} newDataAvailable={newDataAvailable} newRequest={newRequest} />
                <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                  <LeftBlock onNewDataAvailable={newDataAvailable} address={"/myrecords"} />
                  <Calendar />
                </div>
              </React.Fragment>
            } />
            <Route path="/addData" element={
              <React.Fragment>
                <Header deviceConnected={deviceConnected} newDataAvailable={newDataAvailable} newRequest={newRequest} />
                <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                  <LeftBlock onNewDataAvailable={newDataAvailable} address={"/myrecords"} />
                  <NewData passed={data} onDisconnectDevice={disconnectDevice} onSetNewDataAvailable={setNewDataAvailable} onSetNewRequest={setNewRequest} />
                </div>
              </React.Fragment>
            } />
            <Route path="/sharedAccess" element={
                <React.Fragment>
                  <Header deviceConnected={deviceConnected} newDataAvailable={newDataAvailable} newRequest={newRequest} />
                  <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                    <LeftBlock onNewDataAvailable={newDataAvailable} address={"/sharedAccess"} />
                    <SharedAccess newRequest={newRequest} onAction={setNewRequest} />
                  </div>
                </React.Fragment>
              } />
          </Routes>
          <Footer />
        </DataProvider>
      </Router>
    </div>
  );
}