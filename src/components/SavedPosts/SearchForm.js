// //React
// import React, { useEffect, useState } from 'react'
// //Components
// import PostCard from '../PostHere/PostCard';
// //Actions
// import { getAllPosts, getUserPosts } from '../../redux/actions/serverActions'
// import { connect } from 'react-redux'; 

// const SearchForm = props => {
//   // get req to server to retrieve SAVED posts (with id)
//   const [posts, setPosts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     props.getUserPosts(localStorage.getItem('userId'));
//     setPosts(props.userPosts);
//     const results = props.userPosts.filter( post => {
//         return post.title.toLowerCase().includes(searchTerm.toLowerCase())
//     });
//     console.log(results);
//     setSearchResults(results);
//   },[searchTerm, posts]);

//   const handleChange = event => {
//     setSearchTerm(event.target.value);
//     console.log(setSearchTerm);
//   };
//   return (
//     <section>
//       <form>
//         <input 
//           type="text" 
//           name="search" 
//           onChange={handleChange}
//           value={searchTerm} 
//         />
//         <button type="submit">Search</button>
//       </form>
//       <div>
//         {searchResults.map( post => {
//           return post.map((item, index) => {
//             return <PostCard key={index} item={item} />
//         })})}
//       </div>
//     </section>
//   )
// }

// const mapStateToProps = ({ serverReducer }) => { 
//   return { 
//     userId: serverReducer.userId,
//     userPosts: serverReducer.userPosts
//   }
// }

// export default connect(mapStateToProps, 
//   {getAllPosts, getUserPosts}
// )(SearchForm)
