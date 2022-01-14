import {getCertificate} from '../../../services/createDocumentService'
import {setDocumentsList} from "../../../services/authService"
 
export async function getDocumentListFun(){
   try {
    const response = await getCertificate() 
    if(response && response.data){
    //    console.log('Response Data 1 : ',response.data);
       setDocumentsList(response.data)
    }
   } catch (error) {
       console.log('Errors in get documents list : ',error);
   } 
}