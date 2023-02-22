import React,{useState} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const Table=({item,i,deleteUser,editUser})=>{
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleOpen = () => setDeleteOpen(true);
    const handleClose = () => setDeleteOpen(false);
        
    const {_id,name,phone_number,district,location,price,service_charge,insert_date,probability_installation_date,vehicle_type,customer_feedback,install_status}=item;
        return( 
            <div style={{display:"flex",width:'100%',flexDirection:"row", justificontent:"between"}}>
                <Modal
                    keepMounted
                    deleteOpen={deleteOpen}
                    open={deleteOpen}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style} style={{border:'none',borderRadius:10}}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" marginBottom="10px">
                        Do you want to delete ? 
                        <h5>{item.name} !!!</h5> 
                    </Typography>
                    <button style={{height:30,width:70,border:'1px solid red',borderRadius:4,padding:5,color:'red',cursor:'pointer'}} onClick={()=>deleteUser(_id)}>DELETE</button>
                    <button style={{height:30,width:70,marginLeft:15,border:'1px solid green',borderRadius:4,padding:5,color:'green',cursor:'pointer'}} onClick={handleClose}>CANCLE</button>
                    </Box>
                </Modal>
            <div key={i} className='table' style={{flex:8,width:'80%',backgroundColor:'white',textAlign:'left',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <p style={{flex:1}}>{name}</p>
                <p style={{flex:1.5}}>{phone_number}</p>
                <p style={{flex:1}}>{district}</p>
                <p style={{flex:1}}>{location}</p>
                <p style={{flex:1}}>{price}</p>
                <p style={{flex:1}}>{service_charge}</p>
                <p style={{flex:1}}>{insert_date}</p>
                <p style={{flex:1}}>{probability_installation_date}</p>
                <p style={{flex:1.2}}>{vehicle_type}</p>
                <p style={{flex:2.2}}>{customer_feedback}</p>
            </div>

            <div style={{flex:2,width:'100%',backgroundColor:'white',display:'flex',flexDirection:'row',justifyContent:"center",alighItem:'center'}}>
                    <Button onClick={()=>{editUser(item)}} style={{flex:1,color:'#2B3A55',background:'none',border:'none',cursor:'pointer'}}><EditIcon/></Button>
                    <Button  style={{flex:1,background:'none',border:'none',cursor:'pointer'}}>{install_status}</Button>
                    {/* <Button onClick={()=>deleteUser(_id)} style={{padding:10,color:'red',background:'none',border:'none',cursor:'pointer'}}><DeleteForeverIcon/></Button> */}
                    <Button onClick={handleOpen} style={{flex:1,color:'red',background:'none',border:'none',cursor:'pointer'}}><DeleteForeverIcon/></Button>
            </div>      
        </div>         
    )
}

export default Table;