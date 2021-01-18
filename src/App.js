import React from 'react'
import Layout from './components/Layout/Layout'
import Sidebar from './components/Sidebar/Sidebar'
import Messenger from './components/Messenger/Messenger'

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
