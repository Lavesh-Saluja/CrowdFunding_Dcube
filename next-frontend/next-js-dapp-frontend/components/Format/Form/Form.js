import React, { useState }from 'react'
import styled from 'styled-components'
import FormLeftWrapper from "./Components/FormLeftWrapper";
import FormRightWrapper from "./Components/FormRightWrapper";
import {createContext} from 'react';
import {toast} from 'react-toastify'
import {TailSpin} from 'react-loader-spinner';
import {ethers} from 'ethers';
import {contractAddress,abi,} from '/contractData';
const FormState=createContext();
    
function Form() {
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "",
        category: "education",
    });

    const [loading,setloading] = useState(false);
    const [address,setAddress] = useState("");
    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const [image, setImage] = useState(null);
    const [imageUrl,setImageUrl] = useState("");
    const [storyUrl,setStoryUrl] = useState("");
    const [uploaded,setUploaded]=useState(false);
    const ImageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const startCampaign = async (e) => {  
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts',[]);
        const signer = provider.getSigner();
      console.log(signer);
        if(form.campaignTitle === "") {
          window.alert("Title Field Is Empty");
        } else if(form.story === "" ) {
          window.alert("Story Field Is Empty");
        } else if(form.requiredAmount === "") {
          toast.warn("Required Amount Field Is Empty");
        }
        else {        
          setloading(true);  
    
          const contract = new ethers.Contract(
            contractAddress,
            abi,
            signer
          );
            console.log("Passed");
          const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);
          console.log(CampaignAmount);
          const campaignData = await contract.createCampaign(
            form.campaignTitle,
            CampaignAmount,
            imageUrl,
            form.category,
            storyUrl
          );
          console.log("Pass")

          await campaignData.wait();   
            console.log("Pass")
          setAddress(campaignData.to);
        }
    }

    return (
        <FormState.Provider value={{form,setForm,image,setImage,ImageHandler,FormHandler,startCampaign}}>
        <FormWrapper>
            <FormMain>
                {loading == true ?
                address==""?
                 <Spinner><TailSpin height={60} /></Spinner>:
                 <Address>
                    <FormTitle>Organization Registered Successfully</FormTitle>
                    <h1>{address}</h1>
                    <Button>Go to Campaign</Button>
                 </Address>
                :
                <>
                
                <FormInputsWrapper>
                    <FormLeftWrapper />
                    <FormRightWrapper />
                </FormInputsWrapper>
                </>
                
                }
            </FormMain>
            
        </FormWrapper>
        </FormState.Provider>
    )
}

 const FormTitle=styled.div`
 display:flex;
 width:100%;
 justify-content:center;
 align-items:center;
 text-transform:capitalize;
 font-weight:bold;
 font-size:40px;
 font-family:poppins;
 `;
 const FormWrapper = styled.div`
 width: 100%;
 display:flex;
 justify-content:center;
`

const FormMain = styled.div`
 width:80%;
`

const FormInputsWrapper = styled.div`
 display:flex;
 justify-content:space-between ;
 margin-top:45px ;
`

const Spinner = styled.div`
 width:100%;
 height:80vh;
 display:flex ;
 justify-content:center ;
 align-items:center ;
`
const Address = styled.div`
 width:100%;
 height:80vh;
 display:flex ;
 display:flex ;
 flex-direction:column;
 align-items:center ;
 background-color:${(props) => props.theme.bgSubDiv} ;
 border-radius:8px;
`

const Button = styled.button`
 display: flex;
justify-content:center;
width:30% ;
padding:15px ;
color:white ;
background-color:#00b712 ;
background-image:
   linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
border:none;
margin-top:30px ;
cursor: pointer;
font-weight:bold ;
font-size:large ;
`

export default Form
export {FormState}
