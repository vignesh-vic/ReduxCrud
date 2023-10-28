import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'; 
import { addUserList ,editUserList,deleteUserData} from '../../store/reducers/User';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
// import TextField from "@mui/material/TextField";
import { Button, Modal } from "antd";

const UserList = () => {
    const dispatch=useDispatch();
   const UserList =useSelector((state)=>state.users.allUserList) 
  //inputfiled values
  //store id in the state to find id to replace to update values
  const [passingId, setPassingId] = useState();
  //When button is 0, it indicates that you are in "add" mode. When button is 1, it means you are in "update" mode.
  const [changeButtonMode, setchangeButtonMode] = useState(0);
  const [deleteId, setDeleteId] = useState();
  // delete button
  //store index
  const [openDE, setOpenDE] = useState(false);
  //delete model
  const showModalDelete = () => {
    setOpenDE(true);
  };
  const handleOkDelete = () => {
    setOpenDE(false);
  };
  const handleCancelDelete = () => {
    setOpenDE(false);
  };
  const [inputDetails, setInputDetails] = useState([
    {
      Id: "",
      Name: "",
      Email: "",
      Phone: "",
      FatherName: "",
      MotherName: "",
      Address: "",
      Colleage: "",
      Degree: "",
      Year: "",
      Batch: "",
    },
  ]);

  //model
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //get input from onChange and set inputfields
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const [columDefination] = useState([
    { field: "Id" },
    { field: "Name" },
    { field: "Email" },
    { field: "Phone" },
    { field: "FatherName" },
    { field: "MotherName" },
    { field: "Address" },
    { field: "Colleage" },
    { field: "Degree" },
    { field: "Year" },
    { field: "Batch" },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <button
            onClick={() => {
              showModal();
              showModal1(data);
              setchangeButtonMode(1);
            }}
            className="bg-blue-400  w-[60px]"
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <button
            onClick={() => {
              showModalDelete();
              setDeleteId(data.Id);
            }}
            className="bg-red-400 w-[60px]"
          >
            Delete
          </button>
        );
      },
    },
  ]);
  //edit button show datas
  const showModal1 = (resiveObj) => {
    if (resiveObj) {
      setInputDetails({
        Id: resiveObj.Id,
        Name: resiveObj.Name,
        Email: resiveObj.Email,
        Phone: resiveObj.Phone,
        FatherName: resiveObj.FatherName,
        MotherName: resiveObj.MotherName,
        Address: resiveObj.Address,
        Colleage: resiveObj.Colleage,
        Degree: resiveObj.Degree,
        Year: resiveObj.Year,
        Batch: resiveObj.Batch,
      });
    }
    setPassingId(resiveObj.Id);
  };
    //defauldcoldefs
    const defaultCol = {
        sortable: true,
        editable: true,
        filter: true,
        resizable: true,
        flex: 1,
      };
        //find the max id in the table
  const generateUniqueID = () => {
    const maxID = UserList.reduce(
      (max, user) => (user.Id > max ? user.Id : max),
      0
    );
    return maxID + 1;
  };

    //add user
  const onHandleSubmit = () => {
    const newId = generateUniqueID();
    // Create a new product object with the calculated ID and other details
const  pushData={
      Id: newId,
      Name: inputDetails.Name,
      Email: inputDetails.Email,
      Phone: inputDetails.Phone,
      FatherName: inputDetails.FatherName,
      MotherName: inputDetails.MotherName,
      Address: inputDetails.Address,
      Colleage: inputDetails.Colleage,
      Degree: inputDetails.Degree,
      Year: inputDetails.Year,
      Batch: inputDetails.Batch,
    }
    dispatch(addUserList(pushData));
    // Clear the input fields
    setInputDetails({
      Id: "",
      Name: "",
      Email: "",
      Phone: "",
      FatherName: "",
      MotherName: "",
      Address: "",
      Colleage: "",
      Degree: "",
      Year: "",
      Batch: "",
    });
  };
    // handleEditOk update interns
    const handleEditOk = (Id) => {
       const editData={
            Id:Id,
            Name: inputDetails.Name,
            Email: inputDetails?.Email,
            FatherName: inputDetails?.FatherName,
            MotherName: inputDetails?.MotherName,
            Address: inputDetails?.Address,
            Colleage: inputDetails?.Colleage,
            Degree: inputDetails.Degree,
            Year: inputDetails?.Year,
      }
      dispatch(editUserList(editData))
    }

const onHandleDelte=(deleteId)=>{
    dispatch(deleteUserData(deleteId))
}
  return (
    <div>
        
        <div className="pb-5">
            <button
              className="border-2 text-white border-gray-600 w-24 h-10 rounded-md bg-blue-600"
              onClick={() => {
                showModal();
                setInputDetails({
                  Id: "",
                  Name: "",
                  Email: "",
                  Phone: "",
                  FatherName: "",
                  MotherName: "",
                  Address: "",
                  Colleage: "",
                  Degree: "",
                  Year: "",
                  Batch: "",
                });
              }}
            >
              Add Interns
            </button>
            <Modal
              open={open}
              title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="link"
                  type="primary"
                  onClick={
                    changeButtonMode === 0
                      ? () => {
                          onHandleSubmit();
                          handleOk();
                        }
                      : () => {
                          setchangeButtonMode(0);
                          handleEditOk(passingId);
                          handleOk();
                        }
                  }
                //   disabled={
                //   !inputDetails.Name||
                //   !inputDetails.Email||
                //   !inputDetails.Phone||
                //   !inputDetails.FatherName||
                //   !inputDetails.MotherName||
                //   !inputDetails.Address||
                //   !inputDetails.Colleage||
                //   !inputDetails.Degree||
                //   !inputDetails.Year||
                //   !inputDetails.Batch
                // }                               
                >
                  {changeButtonMode === 0 ? "ADD" : "UPDATE"}
                </Button>,
              ]}
            >
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Name"
                placeholder="Name"
                value={inputDetails.Name}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Email"
                placeholder="email"
                value={inputDetails.Email}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Phone"
                placeholder="Phone"
                value={inputDetails.Phone}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="FatherName"
                placeholder="FatherName"
                value={inputDetails.FatherName}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="MotherName"
                placeholder="MotherName"
                value={inputDetails.MotherName}
                onChange={onHandleChange}
              />
              <textarea
                placeholder="Address"
                rows={2}
                name="Address"
                value={inputDetails.Address}
                onChange={onHandleChange}
                className="w-[360px] border border-gray-600"
              ></textarea>
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Colleage"
                placeholder="Colleage"
                value={inputDetails.Colleage}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Degree"
                placeholder="Degree"
                value={inputDetails.Degree}
                onChange={onHandleChange}
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Year"
                value={inputDetails.Year}
                onChange={onHandleChange}
                placeholder="Year"
              />
              <input
                className="border-2 border-gray-600 w-24 h-10 rounded-md p-4"
                style={{ height: "30px", width: "360px", marginBottom: "6px" }}
                name="Batch"
                placeholder="Batch"
                value={inputDetails.Batch}
                onChange={onHandleChange}
              />
            </Modal>
          </div>     
          <Modal
          title="ARE YOU WANT TO DELETE"
          open={openDE}
          onOk={() => {
            handleOkDelete();
            onHandleDelte(deleteId);
          }}
          onCancel={handleCancelDelete}
        ></Modal>
        <div className=" ag-theme-alpine" style={{ height: 1000 }}>
            <AgGridReact
              rowData={UserList}
              columnDefs={columDefination}
              defaultColDef={defaultCol} // Set onGridReady prop
            />
          </div>
   
        
    </div>
  )
}

export default UserList