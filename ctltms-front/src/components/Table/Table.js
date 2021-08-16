import React, { useState } from 'react';
import ModalEditAccount from '../../components/EditModal/EditAccount';
import ModalEditVehicle from '../../components/EditModal/EditVehicle';
import EditIcon from '../../images/edit.png'
import './Table.css';

const Table = ({theadData, tbodyData, edit, refFromMenu, name}) => {
    const [showEditAccount, setShowEditAccount] = useState(false);
    const [showEditVehicle, setShowEditVehicle] = useState(false);

    const showEditAccountModal = () => {
        setShowEditAccount(prev => ({
            showEditAccount: !prev.showEditAccount
        }));
    }

    const showEditVehicleModal = () => {
        setShowEditVehicle(prev => ({
            showEditVehicle: !prev.showEditVehicle
        }));
    }

    return (
        <div>
            {refFromMenu===2? 
                <ModalEditAccount 
                    accountType={name}
                    showEditAccountModal={showEditAccount}
                    onClose={() => showEditAccountModal()}/>
                : <ModalEditVehicle 
                    vehicleType={name}
                    showEditVehicleModal={showEditVehicle}
                    onClose={() => showEditVehicleModal()}/>
            }
            <div className="custom-table">
                <table className="table table-striped table-bordered responsive">
                    <thead className="custom-thead">
                        <tr>
                            {theadData.map((title) => {
                                return <th className="custom-th" scope="col">{title}</th>;
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {tbodyData.map((rowData) => (
                            <tr>
                                {rowData.map((item) => (
                                    typeof(item)==="object"? 
                                        <td className="custom-td">
                                            {item.map((i) => (
                                                <p className="custom-p">{i}</p>
                                            ))}
                                        </td>
                                        : <td className="custom-td">{item}</td>
                                ))}
                                {edit?
                                    <td className="custom-td">
                                        {refFromMenu===2? 
                                            <button 
                                                className="btn-invisible" 
                                                onClick={() => showEditAccountModal()}>                                      
                                                    <img type="button" src={EditIcon} alt="edit" width="15px" />
                                            </button>
                                        :   <button 
                                                className="btn-invisible" 
                                                onClick={() => showEditVehicleModal()}>                                      
                                                <img type="button" src={EditIcon} alt="edit" width="15px" />
                                            </button>
                                        }

                                    </td>
                                    :null
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;