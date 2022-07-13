import React, { useEffect, useState } from 'react'
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


const Patient = () => {

    const [openDlg, setOpenDlg] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [params, setParams] = useState();
    const [update, setUpdate] = useState(false);
    const [search, setSearch] = useState([]);


    const handleClickOpen = () => {
        setOpenDlg(true);
        formik.resetForm()
    };

    const handleClose = () => {
        setOpenDlg(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        age: yup.number().required("Please Enter Your Age."),
        phone: yup.number().test('len', 'Mobile Number Must be a 10 Digits. ', val => val.toString().length === 10).required("Please Enter Youre Mobile number."),
        dob: yup.date().required("Please Enter Date of Birth."),
    })

    const loadData = () => {
        let localD = JSON.parse(localStorage.getItem('patients'));
        if (localD !== null) {
            setData(localD);
        }
    }


    const addData = (value) => {
        let localData = JSON.parse(localStorage.getItem("patients"));
        value = {
            id: Math.floor(Math.random() * 1000),
            ...value
        }

        if (localData === null) {
            localStorage.setItem('patients', JSON.stringify([value]))
        } else {
            localData.push(value);
            localStorage.setItem('patients', JSON.stringify(localData))
        }

        loadData();
    }

    const updData = (val) => {
        let localD = JSON.parse(localStorage.getItem('patients'));

        localD.map((data) => {
            if (data.id === val.id) {
                data.name = val.name;
                data.age = val.age;
                data.phone = val.phone;
                data.dob = val.dob;
            }
        })

        localStorage.setItem('patients', JSON.stringify(localD));
        loadData();
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            phone: '',
            dob: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            update ? updData(values) : addData(values);
        },
        enableReinitialize: true,
    });

    const { handleSubmit, handleBlur, errors, touched, handleChange, values } = formik;


    const handleDelete = () => {
        let localData = JSON.parse(localStorage.getItem('patients'));
        let fData = localData.filter((d) => d.id !== params.id);
        localStorage.setItem('patients', JSON.stringify(fData));
        setData(fData);

        handleAlertClose();
        loadData();
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'age', headerName: 'Age', width: 130 },
        { field: 'phone', headerName: 'Contact no.', width: 130 },
        { field: 'dob', headerName: 'Date of Birth', width: 130 },
        {
            field: 'action', headerName: 'Action',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="Update" onClick={() => {
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
        loadData();
    }, [])


    const handleAlertClose = () => {
        setOpen(false);
    };

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem('patients'));

        let srData = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.age.toString().includes(val.toString()) ||
            d.phone.toString().includes(val.toString()) ||
            d.dob.toString().includes(val.toString())
        ));

        console.log(srData);
        setSearch(srData);
    }

  const finalData = search.length > 0 ? search : data;


    return (
        <>
            <h1>Patient</h1>
            <div>
                <Button variant="outlined" onClick={() => {
                    setUpdate(false);
                    handleClickOpen();
                }} sx={{ marginBottom: '20px' }}>
                    Add Patient Detail
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
                    <DialogTitle> {update ? 'Update Patient Detail' : 'Add Patient Detail'}</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name="name"
                                    label="Add patient name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p className="error">{errors.name}</p> : ''}
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
                                    value={values.phone}
                                    margin="dense"
                                    name="phone"
                                    label="Mobile Number"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phone && touched.phone ? <p className="error">{errors.phone}</p> : ''}

                                <TextField
                                    value={values.dob}
                                    margin="dense"
                                    name="dob"
                                    label="Birth Date"
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.dob && touched.dob ? <p className="error">{errors.dob}</p> : ''}

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    update ? <Button onClick={handleClose} type='submit'>Update</Button>
                                        : <Button onClick={handleClose} type='submit'>Submit</Button>
                                }
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={finalData}
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

export default Patient
