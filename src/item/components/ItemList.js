import React, { useState, useEffect } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import { Icon, IconButton } from "rsuite";
import "rsuite-table/dist/css/rsuite-table.css";
import "rsuite/dist/styles/rsuite-default.css";
import ApiHelper from "../../api-helper";
//import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button'

const EditActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`Edit id:${rowData[dataKey]}`);
  }
  return (
    <Cell {...props} className='link-group'>
      <IconButton
        appearance='subtle'
        onClick={handleAction}
        icon={<Icon icon='edit2' />}
      />
    </Cell>
  );
};

const RemoveActionCell = ({ rowData, dataKey, ...props }) => {

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("DELETING...");
    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='place_item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>REMOVE</Button>
          </React.Fragment>
        }
      >
        Are you sure you want to delete this item? Deleting cannot be undone.
      </Modal>
      <Cell {...props} className='link-group'>
      <IconButton
        appearance='subtle'
        onClick={showDeleteWarningHandler}
        icon={<Icon icon='trash2' />}
      />
    </Cell>
    </React.Fragment>

  );
};

const ItemList = (props) => {
 // const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState();

  const apiHelper = new ApiHelper();

  useEffect(() => {
    const sendRequest = async () => {
     // setIsLoading(true);
      try {
        const itemsList = await apiHelper.getInventory();
        setDataList(itemsList);

        //setIsLoading(false);
      } catch (err) {
      //  setIsLoading(false);
        console.log(err.message);
      }
    };
    sendRequest();
  }, [apiHelper]);

  return (
    <React.Fragment>
      <Table
        height={830}
        data={dataList}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        <Column width={200} fixed>
          <HeaderCell>Item Name</HeaderCell>
          <Cell dataKey='item' />
        </Column>

        <Column width={250}>
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey='description' />
        </Column>

        <Column width={200}>
          <HeaderCell>Type of Item</HeaderCell>
          <Cell dataKey='type_of_item' />
        </Column>

        <Column width={200}>
          <HeaderCell>Number of items</HeaderCell>
          <Cell dataKey='amount' />
        </Column>

        <Column width={200}>
          <HeaderCell>Price</HeaderCell>
          <Cell dataKey='price' />
        </Column>

        <Column width={550}>
          <HeaderCell>Image</HeaderCell>
          <Cell dataKey='image' />
        </Column>

        <Column width={80} fixed='right'>
          <HeaderCell>Edit</HeaderCell>
          <EditActionCell dataKey={"id"} />
        </Column>

        <Column width={80} fixed='right'>
          <HeaderCell>Remove</HeaderCell>
          <RemoveActionCell dataKey={"id"} />
        </Column>
      </Table>
    </React.Fragment>
  );
};

export default ItemList;
