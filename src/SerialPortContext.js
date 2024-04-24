import React, { createContext, useContext, useState } from 'react';

const SerialPortContext = createContext({});

export const useSerialPort = () => useContext(SerialPortContext);

export const SerialPortProvider = ({ children }) => {
    const [portD, setPortD] = useState(null);
    const [deviceConnected, setDeviceConnected] = useState(false);
    const [data, setData] = useState("");

    let port;

    const connectPort = async () => {
        if ("serial" in navigator) {
            try {
                port = await navigator.serial.requestPort();
                await port.open({ baudRate: 115200 });
                // Adding a check to ensure the device is ready
                if (port.readable && port.writable) {
                    setPortD(port);
                    console.log("Port is fully connected and ready!");
                    setDeviceConnected(true);
                } else {
                    console.error('Port is opened but not ready for read/write operations.');
                    setDeviceConnected(false);
                    return; // Stop further execution if the port isn't ready for I/O
                }
            } catch (err) {
                console.error('Error opening the serial port:', err);
                setDeviceConnected(false);
            }
        } else {
            console.error('Web Serial API not supported.');
        }
    };
    
    const connectReadSerial = async () => {
        await connectPort();
        const mainP = port;
        if (mainP) {
            try {
                const reader = mainP.readable.getReader();
                const writer = mainP.writable.getWriter();
    
                const sendCommand = async () => {
                    const command = new TextEncoder().encode("S");
                    await writer.write(command);
                    writer.releaseLock();
                };
    
                const readData = async () => {
                    try {
                        while (true) {
                            const { value, done } = await reader.read();
                            if (done) {
                                reader.releaseLock();
                                break;
                            }
                            setData(prevData => prevData + new TextDecoder().decode(value));
                        }
                    } catch (err) {
                        console.error('Error reading data from the serial port:', err);
                    }
                };
    
                await sendCommand();
                await readData();
            } catch (err) {
                console.error('Error with serial port communication:', err);
            }
        } else {
            console.log('The port is not readable');
        }
    };

    const disconnectDevice = async () => {
        const mainP = portD;
        console.log("disconnect clicked")
        if (mainP) {
            try {
                console.log("disconnect")
                if (mainP.writable) {
                    const writer = mainP.writable.getWriter();
                    const connection = new TextEncoder().encode("D");
                    await writer.write(connection);
                    writer.releaseLock();
                }
                // await closePort();
                setDeviceConnected(false);
            } catch (err) {
                console.error('Error disconnecting device:', err);
            }
        }
    };

    // async function closePort() {
    //     await port.close();
    // }

    return (
        <SerialPortContext.Provider value={{ connectPort, connectReadSerial, disconnectDevice, deviceConnected, data }}>
            {children}
        </SerialPortContext.Provider>
    );
};
