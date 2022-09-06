import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, InputBase, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { addDoctor, deleteDoctor, getDoctors, updateDoctor } from '../redux/actions/doctor.actions';

const Medicine = () => {

  const [openDlg, setOpenDlg] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState();
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState([]);

  const doctor = useSelector(state => state.doctorState.doctor)

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenDlg(true);
    formik.resetForm()
  };

  const handleClose = () => {
    setOpenDlg(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    deg: yup.string().required("Please Enter Degree"),
    age: yup.number().required("Please Enter Age"),
    experience: yup.number().required("Please Enter Experiance Year"),
    status: yup.boolean().required("Please Enter Available Status."),
    profile_pic: yup.mixed().required("Please select Profile Pcture."),
  })

  const loadData = () => {
    // let localD = JSON.parse(localStorage.getItem('doctors'));
    // if (localD !== null) {
    //   setData(localD);
    // }

  }

  const addData = (value) => {

    // let localData = JSON.parse(localStorage.getItem("doctors"));
    // value = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...value
    // }

    dispatch(addDoctor(value))

    // if (localData === null) {
    //   localStorage.setItem('doctors', JSON.stringify([value]))
    // } else {
    //   localData.push(value);
    //   localStorage.setItem('doctors', JSON.stringify(localData))
    // }

    // loadData();
  }

  const updData = (val) => {

    dispatch(updateDoctor(val))

    // let localD = JSON.parse(localStorage.getItem('doctors'));

    // localD.map((data) => {
    //   if (data.id === val.id) {
    //     data.name = val.name;
    //     data.deg = val.deg;
    //     data.age = val.age;
    //     data.experience = val.experience;
    //     data.status = val.status;
    //   }
    // })

    // localStorage.setItem('doctors', JSON.stringify(localD));
    // loadData();
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      deg: '',
      age: '',
      experience: '',
      status: '',
      profile_pic: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      update ? updData(values) : addData(values);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleBlur, errors, touched, handleChange, values, setFieldValue } = formik;

  const handleDelete = () => {
    // let localData = JSON.parse(localStorage.getItem('doctors'));
    // let fData = localData.filter((d) => d.id !== params.id);
    // localStorage.setItem('doctors', JSON.stringify(fData));
    // setData(fData);

    handleAlertClose();
    // loadData();

    dispatch(deleteDoctor(params.id))
  }

  const columns = [
    {
      field: 'profile_pic', headerName: 'Profile Photo', width: 150, renderCell: (params) => {
        return (
          // console.log(params.formattedValue)
          <img src={params.formattedValue} alt="pp" style={{ width: "60px", height: "60px" }} />
        )
      }
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'deg', headerName: 'Degree', width: 100 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'experience', headerName: 'Year of Experience', width: 150 },
    { field: 'status', headerName: 'Available Status', width: 70 },
    {
      field: 'action', headerName: 'Action', width: 100,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => {
            setUpdate(true);
            handleClickOpen();
            formik.setValues(params.row);
          }}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => {
            setOpen(true);
            setParams(params);
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  useEffect(() => {
    dispatch(getDoctors());
  }, [])

  const handleAlertClose = () => {
    setOpen(false);
  };

  const handleSearch = (val) => {
    let localData = JSON.parse(localStorage.getItem('doctors'));

    let srData = localData.filter((d) => (
      d.name.toLowerCase().includes(val.toLowerCase()) ||
      d.deg.toLowerCase().includes(val.toLowerCase()) ||
      d.age.toString().includes(val.toString()) ||
      d.experience.toString().includes(val.toString()) ||
      d.status.toString().includes(val.toString())
    ));

    console.log(srData);
    setSearch(srData);
  }

  // const finalData = search.length > 0 ? search : data;

  return (
    <>
      <h1>Doctors</h1>
      <div>
        <Button variant="outlined" onClick={() => {
          setUpdate(false);
          handleClickOpen();
        }} sx={{ marginBottom: '20px' }}>
          Add Doctor
        </Button>

        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Medicines Here"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Dialog fullWidth open={openDlg} onClose={handleClose}>
          <DialogTitle> {update ? 'Update Doctor' : 'Add Doctor'}</DialogTitle>
          <Formik values={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  value={values.name}
                  margin="dense"
                  name="name"
                  label="Add Doctor's Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? <p className="error">{errors.name}</p> : ''}
                <TextField
                  value={values.deg}
                  margin="dense"
                  name="deg"
                  label="Degree"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.deg && touched.deg ? <p className="error">{errors.deg}</p> : ''}

                <TextField
                  value={values.age}
                  margin="dense"
                  name="age"
                  label="Age"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.age && touched.age ? <p className="error">{errors.age}</p> : ''}

                <TextField
                  value={values.experience}
                  margin="dense"
                  name="experience"
                  label="Year of Experience"
                  type="year"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.experience && touched.experience ? <p className="error">{errors.experience}</p> : ''}

                <TextField
                  value={values.status}
                  margin="dense"
                  name="status"
                  label="Available"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.status && touched.status ? <p className="error">{errors.status}</p> : ''}

                <input
                  type="file"
                  name="profile_pic"
                  id='profile_pic'
                  onChange={(e) => setFieldValue("profile_pic", e.target.files[0])}
                />
                {errors.profile_pic && touched.profile_pic ? <p className="error">{errors.profile_pic}</p> : ''}


              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                  update ? <Button onClick={() => {
                    handleClose();
                  }} type='submit'>Update</Button>
                    : <Button onClick={handleClose} type='submit'>Submit</Button>
                }
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={doctor}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Sure ! You Want to Delete ?'}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Medicine
