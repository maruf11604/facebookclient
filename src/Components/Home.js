import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EntryForm from './EntryForm';
import Table from './Table';
import './style.css'
import './table.css'
import './form.css'

const Home=()=>{
    const [state, setState] = useState({
        open:false,
        datas:[],
        searchItem:"",
        dataResults:[],
        nextday:false,
        selectedUser : null,
        deleteOpen :false
    })

    useEffect(() => {
        getUser();
      }, []);

    const getUser=()=>{
        axios.get('http://192.168.0.129/users')
          .then(res => {
            let data = res.data
            let old = {...state}
            old.datas = data
            old.dataResults = data
            setState(old)
          })
          .catch(error => {
            console.log(error);
          });
    }

    const deleteUser=(id)=>{
        axios.delete(`http://192.168.0.129/users/${id}`)
        .then(response => {
        //   console.log(response);
        //   handleClose(true)
        //   getUser();
        let old = {...state}
        old.datas = old.datas.filter(x=>x._id!==id)
        old.deleteOpen=false
        setState(old)

        })
        .catch(error => {
          console.log(error);
        });
    }

    const editUser=(item)=>{
        axios.put(`http://192.168.0.129/users/${item}`)
            .then(res=>{
                let item = res.data
                console.log(item)
                state.selectedUser = item
                state.open=true
                setState(state)
            }
        )
        .catch(err=>{
            console.log(err)
        })
        
    }

    const onAddClick =()=>{
        let old = {...state}
        old.open = true
        old.selectedUser= null
        setState(old)
    }

    const handleClose=()=>{
        let old = {...state}
        old.open = false
        setState(old)
    }

    const saveUser = user=>{
        let old = {...state}
        old.open = false
        old.datas = [user, ...old.datas]
        setState(old)
    }

    const searchText= (e)=>{
        let searchTxt = e.target.value
        let old = {...state}
        if(searchTxt===""){
            old.datas = [...old.dataResults]
        }else{
            old.datas = [...old.dataResults].filter(x=>{
                return (
                    x.name&&x.name.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    x.phone_number&&String(x.phone_number).toLowerCase().includes(searchTxt.toLowerCase()) ||
                    x.district&&x.district.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    x.location&&x.location.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    x.vehicle_type&&x.vehicle_type.toLowerCase().includes(searchTxt.toLowerCase()) 
                    )
            })
        }
        old.searchItem=searchTxt

        console.log(old.searchItem)

        setState(old)
       
    } 

    const getInstallationDate=strDate=>{
        let arr = strDate.split("/")
        return new Date(arr[2],arr[1]-1,arr[0],0,0,0)
    }

    const nextDayFilter=date=>{
        let today = new Date()
        today.setHours(23)
        today.setMinutes(59)
        today.setSeconds(59)

        let nextDay = new Date(today.getTime())
        nextDay.setDate(nextDay.getDate()+1)


        return date.getTime()>=today.getTime() && date.getTime()<=nextDay.getTime()


    }

    const onCheckChanged=(e)=>{
        let old = {...state}
        old.nextday = !old.nextday

        if(old.nextday){
            old.datas = [...old.dataResults].filter(x=>nextDayFilter(getInstallationDate(x.probability_installation_date)))
        }else{
            old.datas =[...old.dataResults] 
        }
        // console.log(getInstallationDate(old.datas[0].probability_installation_date))
        setState(old)
    }

   
//MyItem
    

   return(
        
        <div>
            <div className="home">
                <div className="topdiv">
                    <div className='fetchtop'>
                        <p style={{fontWeight:"bolder",padding:"10px",fontSize:"20px"}}>FACEBOOK CLIENT LIST</p>
                    </div>
                </div>
                <div className="bottomdiv">
                    <div className="middiv">
                        <div className="midhead">
                            <div style={{width:"35%",height:"50px",float:"right",backgroundColor:"orange",borderRadius:"0px 10px 0px 0px"}}>
                               <input
                                type="search" 
                                placeholder="Search..." 
                                name="search" 
                                value={state.searchItem}
                                onChange={searchText}/>
                                <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
                                    <Button onClick={onAddClick} style={{float:"right",marginTop:"7px",marginRight:"10px",fontWeight:"bolder"}}><AddIcon style={{fontWeight:"bolder"}}/></Button>
                                </Tooltip>                      
                                <Tooltip  title="Next Day" enterDelay={200} leaveDelay={200}>
                                    <Checkbox style={{float:"right",height:"30px",width:"35px",marginTop:"10px"}} label="Next" checked={state.nextday}  onChange={onCheckChanged}  />
                                </Tooltip>                           
                            </div> 
                        </div>
                        <div  style={{display:'flex',flexDirection:'row',justificontent:'center',height:35, width:'100%',backgroundColor:"#7DB9B6",marginTop:-35}}>
                            <div style={{flex:8,backgroundColor:'#227C70',color:'white',fontWeight:'bold',padding:5,textAlign:'left',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                            <p style={{flex:1}}>Name</p>
                            <p style={{flex:1.5}}>Mobaile</p>
                            <p style={{flex:1}}>District</p>
                            <p style={{flex:1}}>Location</p>
                            <p style={{flex:1}}>Price</p>
                            <p style={{flex:1}}>Service</p>
                            <p style={{flex:1}}>Insert Date</p>
                            <p style={{flex:1}}>Install Date</p>
                            <p style={{flex:1.2}}>Vehicle_Type</p>
                            <p style={{flex:2}}>Feedback</p>
                            </div>
                        <div style={{flex:2,backgroundColor:'#227C70',color:'white',fontWeight:'bold',padding:5}}>Action</div>
                        </div >
                        <div className='midbottom'>
                            {
                            state.datas.map((x,i)=><Table i={i} editUser={editUser}  deleteUser={deleteUser}  item={x}/>)
                            }
                        </div>         
                    </div>
                </div>
            </div>
        {
            state.open && <EntryForm open={state.open} handleClose={handleClose} saveUser={saveUser} setState={state.selectedUser}/>
        }
    
        </div>

    )
}

export default Home;