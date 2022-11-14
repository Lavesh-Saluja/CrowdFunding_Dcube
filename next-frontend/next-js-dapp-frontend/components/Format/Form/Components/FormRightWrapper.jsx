import React,{useContext,useState} from 'react'
import styled from 'styled-components'
import {FormState} from '../Form';
function FormRightWrapper() {
    const Handler = useContext(FormState);
  const [uploaded,setUploaded]=useState(true);
    return (
        <FormRight>
           <FormInput>
            <FormRow>
            <RowFirstInput>

            <label>Required Amount</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name="requiredAmount" type={'number'} placeholder='Required Amount'></Input>

            </RowFirstInput>
           <RowSecondInput>
            <label>Choose Category</label>
            <Select placeholder="Health" name="category" onChange={Handler.FormHandler} value={Handler.form.category} >
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>

           </RowSecondInput>
            </FormRow>
            
           </FormInput>

           {/* Image */}
           <FormInput>
           <Image alt="dapp" onChange={uploaded==false? window.alert("Files Upload Required"):Handler.ImageHandler} type={'file'} accept='image/*'>
        </Image>
       </FormInput>
        <Button onClick={Handler.startCampaign}>Start Campaign</Button>
        </FormRight>
    )
}
const FormRight = styled.div`
  width:45%;
`
const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`

const FormRow = styled.div`
  display: flex;
  justify-content:space-between;
  width:100% ;
`

const Input = styled.input`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
` 

const RowFirstInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const RowSecondInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const Select = styled.select`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
`

const Image = styled.input`
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
  }  
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:100% ;
  padding:15px ;
  color:white ;
  background-color:'green' ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
  `
export default FormRightWrapper
