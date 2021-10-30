import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Container,Paper,Button} from '@mui/material';
import {makeStyles} from '@material-ui/core/styles';


const useStyles= makeStyles((theme)=>({
    root:{
        '& > *':{margin: theme.spacing(1)},
    },
}))
export default function Student() {
const paperStyle={
    padding:'50px 20px',
    margin:'20px auto',
    width:600
}
const classes=useStyles();
const [name,setName]=React.useState('')
const [adress, setAdress]=React.useState('')
const [students,setStudents]=React.useState([])
const handleClick=(e)=>{
   e.preventDefault();
   const student ={name,adress}
   fetch("http://localhost:8888/student/add",{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify(student)

   }).then(()=>{
      console.log("Student is added") 
   })
}

React.useEffect(()=>{
    fetch("http://localhost:8888/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
        setStudents(result);
    })
})

  return (
   
      
     <Container>
         <Paper elevation={3} style={paperStyle}>
             <h1 style={{color:'blue'}}>Add Student</h1>
      <form className={classes.root} noValidate autoComplete="off">
       
        <TextField
          id="Name"
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <TextField
          id="Adress"
          label="Adress"
          type="text"
          variant="outlined"
          fullWidth
          value={adress}
          onChange={(e)=>{setAdress(e.target.value)}}
        />

        <Button variant="contained" onClick={handleClick}>Submiit </Button>
      </form>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
      <h1 style={{color:'blue'}}>Students added</h1>
          {students.map(student=>(
              <Paper elevation={6} style={{margin:"10px", paddin:"15px", textAlign:"left"}} key={student.id}>
                  <p style={{marginLeft:"18px"}}>Name:{student.name}</p>
                 
                  <p  style={{marginLeft:"18px"}}>Adress:{student.adress}</p>
              </Paper>
          ))}
      </Paper>
      </Container> 
 
   
  );
}
