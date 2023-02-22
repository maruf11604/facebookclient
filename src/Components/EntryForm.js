import React, { useState, useEffect } from 'react'
import { Modal } from "@mui/material"
import TextField from '@mui/material/TextField';
import Box from '@mui/joy/Box';
import axios from 'axios';


const EntryForm = ({ open, handleClose, saveUser,selectedUser }) => {
  const [user, setUser] = useState({
      name: "",
      phone_number: "",
      district: "",
      location: "",
      insert_date: "",
      probability_installation_date: "",
      price:0,
      service_charge:0,
      vehicle_type: "",
      customer_feedback: "",
      install_status:""
})
  useEffect(()=>{
    setUser({...selectedUser})
  },[selectedUser])

  console.log(selectedUser,"hhh")

  const handleInput = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      
      console.log(user)
      axios.post('http://192.168.0.129/users', user)
          .then(function (response) {
              console.log(response);
              saveUser(user)
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  return (
      <Modal
          data-aos="fade-up"
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
      >
          <Box className='entry'>
              <div>
                  <div className='centerdiv'>
                      <h3 style={{ textAlign: "center", width: "570px", position: "fixed", border: "none" }}>{selectedUser?"Updade Client Information":"ADD Client Information"}</h3>
                      <div >
                          <form className='centerdiv2' onSubmit={handleSubmit}>
                              <TextField
                                  className="textfield"
                                  type="text"
                                  name="name"
                                  value={user.name}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  label="customer_name"
                              />
                              <TextField
                                  className="textfield"
                                  type="number"
                                  name='phone_number'
                                  value={user.phone_number}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  label='phone_number'
                                  style={{ marginTop: 25 }}
                              />
                              <TextField
                                  className="textfield"
                                  type="text"
                                  name='district'
                                  value={user.district}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  label='District'
                                  style={{ marginTop: 25 }}
                              />
                              <TextField
                                  className="textfield"
                                  type="text"
                                  name='location'
                                  value={user.location}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  label='location'
                                  style={{ marginTop: 25 }}
                              />
                              <TextField
                                  className="textfield"
                                  type="number"
                                  name='price'
                                  value={user.price}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  id="outlined-basic"
                                  label="Price"
                                  variant="outlined"
                                  style={{ marginTop: 25,width:275 }}
                              />
                              <TextField
                                  className="textfield"
                                  type="number"
                                  name='service_charge'
                                  value={user.service_charge}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  label="Service_chagre"
                                  variant="outlined"
                                  style={{ marginTop: 25,marginLeft:7,width:275}}
                              />
                              <div>
                                  <input
                                      style={{ height: "40px", fontSize: "18px", width: "96.8%", marginTop: "30px", border: "1px solid silver", padding: "5px", borderRadius: "5px" }}
                                      type="date"
                                      margin-left="10px"
                                      name='insert_date'
                                      value={user.insert_date}
                                      onChange={handleInput}
                                      autoComplete="off"
                                      label='insert_date'
                                      variant="outlined"

                                  />
                              </div>
                              <div >
                                  <input
                                      style={{ height: "40px", width: "96.8%", fontSize: "18px", marginTop: "15px", border: "1px solid silver", borderRadius: "5px", padding: "5px" }}
                                      type="date"
                                      margin-left="10px"
                                      name='probability_installation_date'
                                      value={user.probability_installation_date}
                                      onChange={handleInput}
                                      autoComplete="off"
                                      label='probabal_install_date'
                                      variant="outlined"
                                  />
                              </div>

                              <div style={{ height: "50px", width: "98.5%", marginTop: "15px", border: "1px solid silver", borderRadius: "5px" }}>
                                  <h6 style={{ padding: "5px" }}></h6>
                                  <select className="selector"

                                      onChange={handleInput}
                                      type="text"
                                      name='vehicle_type'
                                      label='vehicle_type'
                                      value={user.vehicle_type}
                                      autoComplete="off"
                                      placeholder=''
                                  >
                                      <option>Select Vehicle</option>
                                      <option>BUS</option>
                                      <option>BIKE</option>
                                      <option>TRACK</option>
                                      <option>CNG</option>
                                      <option>EASY BIKE</option>
                                      <option>COVER VAN</option>
                                      <option>LONCH</option>
                                      <option>CAR</option>
                                  </select>
                              </div>
                              <TextField
                                  className="textfield"
                                  type="text"
                                  name='customer_feedback'
                                  value={user.customer_feedback}
                                  onChange={handleInput}
                                  autoComplete="off"
                                  label='feedback'
                                  style={{ marginTop: 10 }}
                              />
                                <div style={{ height: "50px", width: "98.5%", marginTop: "15px", border: "1px solid silver", borderRadius: "5px" }}>
                                  <h6 style={{ padding: "5px" }}></h6>
                                  <select className="selector"

                                      onChange={handleInput}
                                      type="text"
                                      name='install_status'
                                      label='install_status'
                                      value={user.install_status}
                                      autoComplete="off"
                                      placeholder=''
                                  >
                                      <option>status</option>
                                      <option>Running</option>
                                      <option>Cancle</option>
                                      <option>Panding</option>
                                  </select>
                              </div>
                          </form>
                          <div style={{ height: "50px", width: "100%", marginTop: "15px", position: "fixed" }}>
                              <button className="button" style={{cursor:'pointer'}} onClick={handleClose}>Close</button>
                              <button type='submit' className="button" style={{cursor:'pointer'}} onClick={handleSubmit}>{selectedUser?"Update":"Send"}</button>
                          </div>

                      </div>

                  </div>
              </div>
          </Box>
      </Modal>
  )
}

export default EntryForm