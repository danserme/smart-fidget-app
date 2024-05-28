# Smart Fidget App

The Smart Fidget App is a decentralized application (dApp) that allows users to interact with a smart contract for managing fidget spinner data. This project leverages blockchain technology to ensure secure and transparent management of fidget spinner usage records.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
- [Smart Contract](#smart-contract)

## Description

The Smart Fidget App provides a platform for users to manage their fidget spinners using a smart contracts. The application records usage data and allows users to retrieve and manage this data through a web interface.

## Features

- Record fidget spinner usage
- Retrieve usage data
- Manage fidget spinner records
- Secure and transparent data storage on the Ethereum blockchain

## Requirements

- Node.js
- npm
- Hardhat
- MetaMask connected to Polygon zkEVM Cardona

## Usage

1. **Start the Development Server**:
    ```bash
    npm start
    ```

2. **Open the Application**:
    Open your browser and navigate to `http://localhost:3000`.

3. **Connect to MetaMask**:
    Connect your MetaMask wallet to interact with the deployed smart contracts.

4. **Interact with the App**:
    - Register a new fidget spinner
    - Record usage
    - View and manage fidget spinner data

## Smart Contract

The smart contracts for this application are written in Solidity and managed using Hardhat. The primary contract, `FidgetSpinner.sol`, includes functions for registering and managing fidget spinner usage data.
