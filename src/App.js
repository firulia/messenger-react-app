import React, {Component} from 'react'
import Layout from './Layout/Layout'
import Sidebar from './Sidebar/Sidebar'
import Messenger from './Messenger/Messenger'

function App() {
  return (
   <Layout>
     <Sidebar></Sidebar>
     <Messenger>
     </Messenger>
   </Layout>
  );
}

export default App;
