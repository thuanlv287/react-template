// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCog } from "@fortawesome/free-solid-svg-icons";

// export default class Settings extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isSettingOpen: false
//         }
//     }
//     toggleSetting2 = () => {

//         if (!this.state.isSettingOpen) {
//             // attach/remove event handler
//             document.addEventListener('click', this.handleOutsideClick2, false);
//         } else {
//             document.removeEventListener('click', this.handleOutsideClick2, false);
//         }
        
//         this.setState({
//             isSettingOpen: !this.state.isSettingOpen
//         })
//     }
//     handleOutsideClick2 = (e) => {
//         if (this.settingElement && this.settingElement.contains(e.target)) {
//             return;
//         }

//         this.toggleSetting2();
//     }

//     render() {
//         const { isSettingOpen } = this.state
//         return (
//             <div className="setting" ref={e => this.settingElement = e}>
//                 <span className="setting__icon" onClick={this.toggleSetting2}>
//                     <FontAwesomeIcon icon={faCog} />
//                 </span>
//                 {
//                     isSettingOpen && <ul className="setting__list">
//                     <li className="setting__list__item"><Link to="/rc-components">Components</Link></li>
//                     <li className="setting__list__item"><Link to="/setting">Setting</Link></li>
//                     <li className="setting__list__item"><Link to="/profile">Profile</Link></li>
//                     <li className="setting__list__item"><Link to="/login">Logout</Link></li>
//                 </ul>
//                 }
//             </div>
//         )
//     }
// }