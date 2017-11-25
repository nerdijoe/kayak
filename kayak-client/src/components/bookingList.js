/**
 * Created by ManaliJain on 11/24/17.
 */
import React, {Component} from 'react';
import {loginData} from '../actions/index';
import {connect} from 'react-redux';

class BookingList extends Component{
    constructor(props) {
        super(props);
        let loginData = this.props.loginDataProp;
        // let name = loginData.firstname + " " + loginData.lastname;
        this.state = {}
    }

    myCallbackForDeleteFileGroup = (callFileList) =>{
        console.log("inside this hti thsi");
        this.props.callGroup('group');
    }

    render() {

        const booking =  this.props.booking;
        console.log("booking",booking);

        if(booking !== ''){
            return(
                <div></div>
            );
            // let members = '';
            // if(group.membersArray.length>0){
            //     for(let i = 0; i<group.membersArray.length;i++){
            //         members = members + group.membersArray[i].member_name +" " + " ";
            //     }
            // }
            // let filesInGroup ='';
            // if(group.filesArray.length>0){
            //     filesInGroup =  group.filesArray.map((item, index) => {
            //         return (
            //             <FilesInGroup
            //                 key={index}
            //                 fileListInGrp={item}
            //                 group1 = {group}
            //                 callFileGroup={this.myCallbackForDeleteFileGroup}
            //             />
            //         );
            //     });
            // } else {
            //     filesInGroup = <div> </div>
            // }
            // return (
            //     <div>
            //         <ul className="starred-list">
            //             <div className ="row">
            //                 <li className="starred-item">
            //                     <div className="image-wrapper-groups col-sm-1"> </div>
            //
            //                     <div className="starred-item__content starred-item__title col-sm-3">
            //                         {   group.group_name}
            //                     </div>
            //                     <div className="starred-item__content col-sm-2">
            //                         <div className="side-buttons">
            //                             <div className="upload-button-dir">
            //                                 <div>Upload File</div>
            //                                 <input className="upload" type="file" name="file"
            //                                        onChange={this.uploadFileInGroup}/>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     <div className="starred-item__content col-sm-2">
            //                         <div className="star" onClick={this.openAddMember}><u>Show/Add Member</u></div>
            //                     </div>
            //                     <Modal isOpen={this.state.addMember} onRequestClose={this.closeAddMember}
            //                            style={customStyles} contentLabel="Example Modal">
            //                         {messageForAddMem}
            //                         <h2>Add Members</h2>
            //                         <form>
            //                             <h4> Members in the group are-</h4>
            //                             <div className ="star">
            //                                 <b>{members}</b>
            //                             </div>
            //                             <input type="text" className="form-control" placeholder="Email Id"
            //                                    value={this.state.email}
            //                                    onChange={(event) => {
            //                                        this.setState({...this.state,email: event.target.value});
            //                                    }}required/>
            //                             <br/>
            //                             <div className ="row">
            //                                 <div className ="col-sm-8"></div>
            //                                 <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeAddMember}>close</button></div>
            //                                 <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleAddMember}>Add</button></div>
            //                             </div>
            //                         </form>
            //                     </Modal>
            //                     <div className="starred-item__content col-sm-2">
            //                         <div className="star" onClick={this.openDeleteMember}><u>Delete Member</u></div>
            //                     </div>
            //                     <Modal isOpen={this.state.deleteMember} onRequestClose={this.closeDeleteMember}
            //                            style={customStyles} contentLabel="Example Modal">
            //                         {messageForDeleteMem}
            //                         <h2>Delete Members</h2>
            //                         <form>
            //                             <h4> Select Members to delete form the group-</h4>
            //                             <div className ="star">
            //                                 <b>{members}</b>
            //                             </div>
            //                             <input type="text" className="form-control" placeholder="Member Full Name"
            //                                    value={this.state.d_name}
            //                                    onChange={(event) => {
            //                                        this.setState({...this.state,d_name: event.target.value});
            //                                    }}required/>
            //                             <br/>
            //                             <div className ="row">
            //                                 <div className ="col-sm-8"></div>
            //                                 <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.closeDeleteMember}>close</button></div>
            //                                 <div className ="col-sm-2"><button className ="btn btn-info" onClick={this.handleDeleteMember}>Delete</button></div>
            //                             </div>
            //                         </form>
            //                     </Modal>
            //                     <div className="starred-item__content col-sm-2">
            //                         <div className="star" onClick={this.handleDeleteGroup}><u>Delete Group</u></div>
            //                     </div>
            //                 </li>
            //             </div>
            //             <ul className="starred-list">
            //                 {filesInGroup}
            //             </ul>
            //         </ul>
            //     </div>
            // );
        }else {
            return (
                <div>
                    <div className = "row">
                        <ul className="starred-list">
                            <li className="starred-item">
                                <div className="starred-item__content">

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }

    }
}
function mapStateToProps(state) {
    console.log("state App", state)
    return{
        loginDataProp : state.loginData
    };
}

// function mapDispatchToProps(dispatch) {
//     // return bindActionCreators({loginState:loginState},dispatch)
//     return {
//         loginState: (data) => dispatch(loginState(data))
//     };
// }

export default connect(mapStateToProps, null)(BookingList);