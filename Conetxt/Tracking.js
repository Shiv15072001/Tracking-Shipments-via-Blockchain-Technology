import React, {useState,useEffect} from 'react';
import Web3Modal from "web3modal";
import {ethers} from "ethers" ;



//INTERNAL IMPORT

import tracking from "../Conetxt/Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// 0x5FbDB2315678afecb367f032d93F642f64180aa3

const contractABI = tracking.abi;

//---FETCHING SMART CONTRACT

const fetchContract = (signerOrProvider) => 
    new ethers.Contract(ContractAddress,contractABI,signerOrProvider)


export const TrackingContext = React.createContext()

export const TrackingProvider = ({children}) => {
    //STATE VARIABLE
    const DappName = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        const {receiver, pickupTime, distance,price} = items;

        try {
            // entire connection from the user to the contract
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price,18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                },
                
            );
            await createItem.wait();
            window.location.reload() //reload page after tranaction confirmation
            console.log(createItem)
        }
            catch(error) {
                console.log("Somethings went Wrong", error);
            }
            
        }

        const getAllShipment = async () => {
            console.log("I am ruuning")
            try{
                const provider = new ethers.providers.JsonRpcProvider();
                const contract = fetchContract(provider);

                const shipments = await contract.getAllTransactions();
                console.log(shipments)
                const allShipments = shipments.map((shipment) => ({
                    sender : shipment.sender,
                    receiver : shipment.receiver,
                    price : ethers.utils.formatEther(shipment.price.toString()),
                    pickupTime : shipment.pickupTime.toNumber(),
                    deliveryTime : shipment.deliveryTime.toNumber(),
                    distance : shipment.distance.toNumber(),
                    isPaid : shipment.isPaid,
                    status : shipment.status
                }));
                return allShipments;
            }
            catch(error){
                console.log("error want, getting shipment");
            }
        }

        const getShipmentCount = async () => {
            try{
                if (!window.ethereum) return "Install MetaMask";

                const account = await window.ethereum.request({
                    method : "eth_accounts",
                });

                const provider = new ethers.providers.JsonRpcProvider();
                const contract = fetchContract(provider);
                const shipmentsCount = await contract.getShipmentCount(account[0]);
                console.log(shipmentsCount)
                return shipmentsCount.toNumber();
            }
            catch (error){
                console.log("error want, getting shipments");
            }
        };

        const completeShipment = async (completeShip) => {
            console.log(completeShip)

            const {receiver, index} = completeShip;
            try{
                if(!window.ethereum) return "Install MetaMask";

                const account = await window.ethereum.request({
                    method :"eth_accounts",
                })
                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provide = new ethers.providers.Web3Provider(connection);
                const signer = provide.getSigner();
                const contract = fetchContract(signer);

                const transaction = await contract.completeShipment(
                    account[0],
                    receiver,
                    index,
                    {
                        gasLimit : 300000,
                    },
                );

                transaction.wait();
                window.location.reload();
                console.log(transaction);
            }
            catch (error){  
                console.log("Wrong CompleteShipment", error);
            }
        };

        const getShipment = async (index) => {
            // console.log(index = 1);
            try{
                if (!window.ethereum) return "Install MetaMusk";

                const account = await window.ethereum.request({
                    method : "eth_accounts",
                })

                const provider = new ethers.providers.JsonRpcProvider();
                const contract = fetchContract(provider);
                const shipment = await contract.getShipment(account[0], index*1);
                console.log(shipment[2])
                const SingleShipment = {
                    sender : shipment[0],
                    receiver : shipment[1],
                    pickupTime : shipment[2].toNumber(),
                    deliveryTime: shipment[3].toNumber(),
                    distance : shipment[4].toNumber(),
                    price : ethers.utils.formatEther(shipment[5]),
                    status : shipment[6],
                    isPaid : shipment[7],
                }
                console.log(SingleShipment)
                return SingleShipment;
            } catch (error) {
                console.log("Sorry no Shipment");
                return undefined;
            }
        };

        const startShipment = async (getProduct) => {
            const {receiver, index} = getProduct;
            try {
                if (!window.ethereum) return "Install MetaMusk";

                const account = await window.ethereum.request({
                    method : "eth_accounts",
                })

                const web3Modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provide = new ethers.providers.Web3Provider(connection);
                const signer = provide.getSigner();
                const contract = fetchContract(signer);

                const shipment = await contract.startShipment(
                    account[0],
                    receiver,
                    index * 1
                );
                shipment.wait();
                window.location.reload()
                console.log(shipment)
            } catch (error) {
                console.log("Sorry no shipment", error);
                return undefined;
            }
        };

        // check wallet connected
        const checkIfWalletConnected = async () => {
            try{
                if (!window.ethereum) return "Install MetaMask";

                const accounts = await window.ethereum.request({
                    method : "eth_accounts",
                })
                if (accounts.length){
                    setCurrentUser(accounts[0])
                } else {
                    return "No account";
                }
            }
            catch (error) {
                return "not connected";
            }
        };

        //--Connect Wallet Function

        const connectWallet = async () => {
            try {
                if (!window.ethereum) return "Install MetaMask";

                const accounts = await window.ethereum.request({
                    method : "eth_requestAccounts",
                });

                setCurrentUser(accounts[0]);

            } catch(error){
                return "Something went wrong";
            }
        };

        useEffect(() => {
            checkIfWalletConnected();
        }, []);

        return (
            <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentCount,
                DappName,
                currentUser,
            }}
            > 
            {children}
            </TrackingContext.Provider>
        )
    }


