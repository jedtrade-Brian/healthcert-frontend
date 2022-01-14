import React from 'react'
import { formatDate } from '../Shared/dateTimeFormat';
import * as XLSX from "xlsx";
import DICTUrl from "../../assets/DICT_Image.PNG";
import PDDMCSUrl from "../../assets/PDDMCS_Image.PNG";
import ADSMUrl from "../../assets/ADSM_Image.PNG";
import ADCSUrl from "../../assets/ADCS_Image.PNG";
import PGDSLIUrl from "../../assets/PGDSLI_Image.PNG";
import HCPCRUrl from "../../assets/HCPCR_Image.PNG";
import TwoApproverUrl from "../../assets/TwoApprover_Image.png"; // To be changed to TwoApprover template image
import anyUrl from "../../assets/combine_certificate.svg";

export default class TVCertificateQuotation extends React.Component {
    mounted;
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            items: [],
            imageUrl: null,
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.loadImage();
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    
    loadImage = () => {
        switch(this.props.template){
            case "DICT_Doc" :
                this.setState({imageUrl: DICTUrl});
                break;
            case "ADSM_Doc" :
                this.setState({imageUrl: ADSMUrl});
                break;   
            case "ADCS_Doc" :
                this.setState({imageUrl: ADCSUrl});
                break;      
            case "PGDSLI_Doc" :
                this.setState({imageUrl: PGDSLIUrl});
                break;
            case "PDDMCS_Doc" :
                this.setState({imageUrl: PDDMCSUrl});
                break;
            case "TwoApprover_Doc" :
                this.setState({imageUrl: TwoApproverUrl});
                break;
            case "HCPCR_Doc" :
                this.setState({imageUrl: HCPCRUrl});
                break;
            case "any" :
                this.setState({imageUrl: anyUrl});
                break;
            default :  
                break;
        }
    }

    readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            if(this.mounted){
                this.setState({ items: d })
            }
        });
    };

    render() {
        
        return (
            <div>
                File uploaded: <a onClick={this.readExcel(this.props.fileObj)}>{this.props.fileObj.name}</a>
                <div>{this.props.formData.length} students uploaded</div>
                <div style={{paddingTop: "10px"}}>
                    <span style={{verticalAlign: "top", paddingRight: "10px"}}>Certificate Type:</span>
                    <div style={{display: 'inline-block', textAlign: 'center'}}>
                        <img src={this.state.imageUrl} width="250px" height="325px" />
                        { this.props.template === 'any' && <div>Multiple Templates</div> }
                    </div>
                </div>

                {/* <table class="table container">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map((d) => (
                                <tr key={d.StudentName}>
                                    <td>{d.StudentName}</td>
                                    <td>{d.Description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
            </div>
        )
    }
}