// import React from 'react';
// import { Link } from 'react-router-dom';

// const menuItems = [
//   {
//     id: 3,
//     path: '/categories',
//     name: 'Category',
//     icon: () => {
//       return (
//         <FontAwesomeIcon icon={faUsers} />
//       )
//     }
//   },
//   {
//     id: 4,
//     path: '/links',
//     name: 'Link',
//     icon: () => {
//       return (
//         <FontAwesomeIcon icon={faUsers} />
//       )
//     }
//   },
// ]

// const menuItemsAdmin = [
//   {
//     id: 1,
//     path: '/users',
//     name: 'User',
//     icon: () => {
//       return (
//         <FontAwesomeIcon icon={faUsers} />
//       )
//     }
//   },
//   {
//     id: 2,
//     path: '/roles',
//     name: 'Role',
//     icon: () => {
//       return (
//         <FontAwesomeIcon icon={faUsers} />
//       )
//     }
//   },
// ]
// export default class MenuBar extends React.Component {

//   renderMenuItems = (menuItems) => {
//     if (!menuItems || menuItems.length === 0) {
//       return null
//     }

//     return menuItems.map((item, index) => (
//       <li className="side-bar__item" key={index}>
//         <Link to={`${item.path}`}>
//           <span className="menu-icon">{item.icon()}</span>
//           <span>{`${item.name}`}</span>
//         </Link>
//       </li>
//     ))
//   }

//   render() {
//     return (
//       <Menu
//         visible={this.props.isDrawer}
//         className="sidebar-menu"
//       >
//         <div className="menu-bar">
//           <div className="menu-icon__bar">
//             <Link to="/" >
//               <FontAwesomeIcon icon={faHome} />
//             </Link>
//           </div>
//           <ul className="side-bar">
//             {
//               this.renderMenuItems(menuItems)
//             }
//           </ul>
//         </div>
//       </Menu>
//     )
//   }
// }