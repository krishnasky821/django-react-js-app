import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBRow,
    MDBCol

} from 'mdb-react-ui-kit';


import { updateEmpService } from '../apiservices/EmployeesServices';


export default function UpdateEmpModal(props) {
    const emp = props.emp;
    const img_url = 'https://djangoreactt.pythonanywhere.com/' + emp.avtar;


    const [file, setFile] = useState({
        file: null,
        fileName: null
    });

    const [addMSG, setMSG] = useState({
        success_msg: null,
        errors_msg: null
    })

    function resetFormData(e){
        e.target.name.value = '';
        e.target.email.value = '';
        e.target.salary.value = '';
        e.target.position.value = '';
        e.target.department.value = '';
        e.target.job_role.value = '';
        e.target.avtar.value = '';

    }

    const toggleShow = (e) => {
        e.preventDefault();
        props.setAddModal(!props.show);
        setMSG({
            success_msg: null,
            errors_msg: null
        })

    };

    function fileHadler(e){
        e.preventDefault()
        if(e.target.files && e.target.files[0]){
            console.log(file);

            setFile({
                file: e.target.files[0],
                fileName: e.target.files[0].name
            })

            // console.log(e.target.files[0], e.target.files[0].name);
            
        }

    }

    function submitHandler(e){
        e.preventDefault()

        const empData = new FormData();

        empData.append('name', e.target.name.value);
        empData.append('email', e.target.email.value);
        empData.append('position', e.target.position.value);
        empData.append('department', e.target.department.value);
        empData.append('salary', e.target.salary.value);
        empData.append('job_role', e.target.job_role.value);
        if(file.file){
            empData.append('avtar', file.file, file.fileName);
        }

    
        updateEmpService(emp.id, empData)
            .then( response => {
            if(response.status === 200){
                console.log(response.data, response.data.msg)
                props.setUpdated(true)
                setMSG({
                    success_msg: response.data.msg
                })
               
                // reseting form data here
                // resetFormData(e);

            }
            },
            (errors) => {
            
                setMSG({ errors_msg: errors.response.data.non_field_errors[0] })
                // reseting form data here
                // resetFormData(e);
            }
            )
        

    }


    return (
        <>

            <MDBModal tabIndex='-1' show={props.show} setShow={props.setAddModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                       
                        <MDBModalHeader>
                            <MDBModalTitle>Update Employee </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            
                        </MDBModalHeader>
                        <p className='success_msg'>{addMSG.success_msg} </p>
                        <p className='error_msg'>  {addMSG.errors_msg} </p>

                        <MDBModalBody>
                            <form onSubmit={submitHandler}>
                                
                                <MDBInput className='mb-4' type='text' name='name'   label='Full name'       required defaultValue={emp.name}  />
                                <MDBInput className='mb-4' type='email' name='email' label='Email address'   required defaultValue={emp.email} />
                                <MDBInput className='mb-4' type='text' name='job_role' label='Job role'      required defaultValue={emp.job_role}  />
                                <MDBInput className='mb-4' type='text' name='position' label='Position'      required defaultValue={emp.position}  />
                                <MDBInput className='mb-4' type='text' name='department' label='Department'  required defaultValue={emp.department}  />
                                <MDBInput className='mb-4' type='number' name='salary' label='Salary'        required defaultValue={emp.salary}  />

                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput className='' type='file' name='avtar' onChange={fileHadler}/>
                                    </MDBCol>

                                    <MDBCol className='col-sm-2 '>
                                        <img
                                            src={img_url}
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle update_img'
                                        />
                                    </MDBCol>
                                  
                                </MDBRow>

                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleShow}>
                                        Close
                                    </MDBBtn>

                                    <MDBBtn type='submit'>Update Employee</MDBBtn>
                                </MDBModalFooter>

                            </form>
                            
                        </MDBModalBody>


                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}