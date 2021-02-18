import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducer from './store'
import Layout from './components/Layout/Layout'
import Sidebar from './components/Sidebar/Sidebar'
import Messenger from './components/Messenger/Messenger'

const store = createStore(appReducer)

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Sidebar></Sidebar>
        <Messenger>
        </Messenger>
      </Layout>
    </Provider>
  );
}

export default App;
