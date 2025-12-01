import React, {useState, useEffect, useContext} from 'react'

// Internal import

import{
    Table,
    Form,
    Services,
    Profile,
    CompleteShipment,
    GetShipment,
    StartShipment
} from "../Components/index";

import { TrackingContext } from '../Conetxt/Tracking';

const index = () => {
    const {
        currentUser,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentCount
    } = useContext(TrackingContext);


    // STATE VARIABLE 
    const [createShipmentModel, setCreateShipmentModel] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [startModal, setStartModal] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [getModal,setGetModel] = useState(false);
    //DATA STATE VARIABLE
    const [allShipmentsdata, setallShipmentsdata] = useState(undefined);

    useEffect(() => {
        const getCompaignsData = async () => {
            const allData = await getAllShipment();
            setallShipmentsdata(allData)
        } 
        getCompaignsData();
        
    }, []);

    return (
        <>
        <Services setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
        />
        <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
        />
        <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
        />
        <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
        />
        <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
        />
        <GetShipment
        getModal={getModal}
        setGetModel={setGetModel}
        getShipment={getShipment}
        />
        <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
        />
        </>
    )
};

export default index;
